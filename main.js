const apiUrl = 'http://localhost:3000/data'; // Ganti dengan URL API yang sesuai

document.getElementById('addStudentForm').addEventListener('submit', addStudent);
document.getElementById('updateStudentForm').addEventListener('submit', updateStudent);
document.getElementById('deleteStudentForm').addEventListener('submit', deleteStudent);

function getAllStudents() {
    const studentData = document.getElementById('studentData');
    studentData.innerHTML = ''; // Bersihkan data sebelum menampilkan yang baru

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(student => {
                studentData.innerHTML += `
                    <p>ID: ${student.id}</p>
                    <p>Nama: ${student.name}</p>
                    <p>Email: ${student.email}</p>
                    <p>Usia: ${student.age}</p>
                    <hr>
                `;
            });
        });
}

function addStudent(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;

    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            email: email,
            age: age,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(() => {
        getAllStudents();
        document.getElementById('addStudentForm').reset();
    });
}

function updateStudent(e) {
    e.preventDefault();
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const email = document.getElementById('updateEmail').value;
    const age = document.getElementById('updateAge').value;

    fetch(apiUrl + '/' + id, {
        method: 'PUT',
        body: JSON.stringify({
            name: name,
            email: email,
            age: age,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(() => {
        getAllStudents();
        document.getElementById('updateStudentForm').reset();
    });
}

function deleteStudent(e) {
    e.preventDefault();
    const id = document.getElementById('deleteId').value;

    fetch(apiUrl + '/' + id, {
        method: 'DELETE'
    })
    .then(() => {
        getAllStudents();
        document.getElementById('deleteStudentForm').reset();
    });
}
