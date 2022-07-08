// Tạo mảng danh sách student
//B1: Định nghĩa lớp đối tượng student
function Student(
  masv,
  tensv,
  email,
  pass,
  dateofbirth,
  khoa,
  math,
  physics,
  chemistry
) {
  this.masv = masv;
  this.tensv = tensv;
  this.email = email;
  this.pass = pass;
  this.dateofbirth = dateofbirth;
  this.khoa = khoa;
  this.math = math;
  this.physics = physics;
  this.chemistry = chemistry;
}
Student.prototype.calcDiemTB = function () {
  return (this.math + this.physics + this.chemistry) / 3;
};

// Lưu ý phải để cái hàm khởi tạo đối tượng lên trước
var students = [];
init();
// Hàm này sẽ tự động được gọi đầu tiên khi CT được chạy
function init() {
  //B1: Lấy data từ localStorage
  //Khi lấy data từ localStorage lên, nếu data là array/object ( đã bị striingifly) thì cần dùng hàm JSON.parse để chuyển data về lại
  var students = JSON.parse(localStorage.getItem("students")) || [];

  // Vì JSON.striingifly tự động loại bỏ các phương thức bên trong object => các obj student bên trong mảng bị mất hàm calcScore
  console.log("Mảng student trước khi thay đôi: ", students);
  for (var i = 0; i < students.length; i++) {
    var student = students[i];

    students[i] = new Student(
      student.masv,
      student.tensv,
      student.email,
      student.pass,
      student.dateofbirth,
      student.khoa,
      student.math,
      student.physics,
      student.chemistry
    );
  }
  // student = [{},{},{}]

  //Lần 1: i=0 => students[0] => student = {...}

  console.log("Mảng student sau khi thay đôi: ", students);
  // B2: Gọi hàm display để hiển thị ra giao diện
  display(students);
}

function addStudent() {
  var masv = document.getElementById("txtMaSV").value;
  var tensv = document.getElementById("txtTenSV").value;
  var email = document.getElementById("txtEmail").value;
  var pass = document.getElementById("txtPass").value;
  var dateofbirth = document.getElementById("txtNgaySinh").value;
  var khoa = document.getElementById("khSV").value;
  var math = +document.getElementById("txtDiemToan").value;
  var physics = +document.getElementById("txtDiemLy").value;
  var chemistry = +document.getElementById("txtDiemHoa").value;
  // Kiểm tra hợp lệ (validation)
  var isValid = validation();

  


  if (math < 0 || physics < 0 || chemistry < 0) {
    alert("Vui lòng nhập lại điểm");
    return;
  }
  //   else if (IsInvalidEmail(email))

  //B2: Khởi tạo đối tượng student từ lớp đối tượng Student
  var student = new Student(
    masv,
    tensv,
    email,
    pass,
    dateofbirth,
    khoa,
    math,
    physics,
    chemistry
  );
  //B3: Hiển thị student vừa thêm lên trên giao diện (table)
  // Thêm student vừa tạo vào mảng students
  students.push(student);
  // B4: Lưu biến students xuống local storage ===================
  // setItem(key,value)
  // LOCALSTORAGE: cho phép lưu trữ data trong trình duyệt, data này sẽ không mất đi khi ta refresh
  // LOCALSTORAGE.setItem(key,value) là hàm dùng để lưu data xuống local Storage
  // JSON.stringify(value) là hàm dùng để chuyển array/object thành 1 chuỗi dạng JSON
  localStorage.setItem("students", JSON.stringify(students));
  display(students);
  // Gọi hàm reset
  resetForm();
}

function display(students) {
  var tbodySinhVien = document.getElementById("tbodySinhVien");
  // Chứ nội dung html sẽ được thêm vào bên trong tbody

  var html = "";

  for (var i = 0; i < students.length; i++) {
    var student = students[i];
    // Với mỗi student tạo ra 1 thẻ tr và từng thẻ td chứ thông tin của chính student đó
    html += `
            <tr>
                <td>${student.masv}</td>
                <td>${student.tensv}</td>
                <td>${student.email}</td>
                <td>${student.dateofbirth}</td>
                <td>${student.khoa}</td>
                <td>${student.calcDiemTB()}</td>

                <th>
                   <td> <button class="btn btn-success" onclick="selectStudent('${
                     student.masv
                   }')">Chọn</button> </td>
                    <td>
                    <button class="btn btn-danger" onclick="deleteStudent('${
                      student.masv
                    }')">Xóa</button>
                    </td>
                </th>
            </tr>
        `;
    // Lưu ý chỗ student.masv để nháy đơn, để nháy đơn sẽ bị trùng
  }
  tbodySinhVien.innerHTML = html;
}
// function IsInvalidEmail(email) {
//   var at = email.indexOf("@");
//   var dot = email.lastIndexOf(".");
//   var space = email.indexOf(" ");

//   if (
//     at != -1 && //có ký tự @
//     at != 0 && //ký tự @ không nằm ở vị trí đầu
//     dot != -1 && //có ký tự .
//     dot > at + 1 &&
//     dot < email.length - 1 && //phải có ký tự nằm giữa @ và . cuối cùng
//     space == -1
//   ) {
//     //không có khoẳng trắng
//     alert("Email valid");
//     return true;
//   } else {
//     alert("Email Invalid");
//     return false;
//   }
// }

function deleteStudent(mssv) {
  // Dùng id của student tìm ra và xóa student đó đi
  var index = -1; // Phải khác số duyệt trong mảng do i bắt đầu từ 0 nên đặt là -1, ban đầu cho là không tìm thấy
  for (var i = 0; i < students.length; i++) {
    // Kiếm phần tử sutdent trong mảng nào có id khớp với studentID
    if (students[i].masv === mssv) {
      index = i;
      break;
    }
  }
  // Tìm chỉ mục cả phần tử muốn xóa trong mảng
  // var index = findStudent(studentId);
  if (index !== -1) {
    // Xóa 1 phần tử ở 1 vị trí bất kì trong mảng
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    display(students);
  }
}

function searchStudent() {
  //B1
  var timKiem = document.getElementById("txtSearch").value;
  timKiem = timKiem.toLowerCase();
  var newStudent = [];
  // B2: Dựa vào giá trí searchValue lọc ra 1 mảng mới thỏa điều kiển

  // 'Nguyễn Đức Hiếu'.indexOf("Hiếu")=> 11
  // 'Nguyễn Đức Hiếu'.indexOf("Khải")=> -1
  for (var i = 0; i < students.length; i++) {
    var student = students[i];
    var searchName = student.tensv.toLowerCase();
    // indexOf dùng để xét chuỗi con
    if (searchName.indexOf(timKiem) !== -1) {
      // Kiểm tra chuỗi con có trong chuỗi cha hay không
      newStudent.push(student);
    }
  }
  display(newStudent);
}

function resetForm() {
  document.getElementById("txtMaSV").value = "";
  document.getElementById("txtTenSV").value = "";
  document.getElementById("txtEmail").value = "";
  document.getElementById("txtPass").value = "";
  document.getElementById("txtNgaySinh").value = "";
  document.getElementById("khSV").value = "";
  document.getElementById("txtDiemToan").value = "";
  document.getElementById("txtDiemLy").value = "";
  document.getElementById("txtDiemHoa").value = "";
}

function selectStudent(studentId) {
  // Dùng studentId để tìm student tìm ra và xóa student muốn cập nhật
  var index = findStudent(studentId);
  // Lấy ra student muốn cập nhật
  var student = students[index];
  // Đưa thông tin lên lại
  document.getElementById("txtMaSV").value = student.masv;
  document.getElementById("txtTenSV").value = student.tensv;
  document.getElementById("txtEmail").value = student.email;
  document.getElementById("txtPass").value = student.pass;
  document.getElementById("txtNgaySinh").value = student.dateofbirth;
  document.getElementById("khSV").value = student.khoa;
  document.getElementById("txtDiemToan").value = student.math;
  document.getElementById("txtDiemLy").value = student.physics;
  document.getElementById("txtDiemHoa").value = student.chemistry;

  //
  document.getElementById("txtMaSV").disabled = true;
  document.getElementById("addStudent1").disabled = true;
}

function findStudent(studentId) {
  var index = -1;
  for (var i = 0; i < students.length; i++) {
    if (students[i].masv === studentId) {
      index = i;
    }
  }
  return index;
}

function updateStudent() {
  // B1: Dom lấy value từ các input
  var masv = document.getElementById("txtMaSV").value;
  var tensv = document.getElementById("txtTenSV").value;
  var email = document.getElementById("txtEmail").value;
  var pass = document.getElementById("txtPass").value;
  var dateofbirth = document.getElementById("txtNgaySinh").value;
  var khoa = document.getElementById("khSV").value;
  var math = +document.getElementById("txtDiemToan").value;
  var physics = +document.getElementById("txtDiemLy").value;
  var chemistry = +document.getElementById("txtDiemHoa").value;

  //B2 Khởi tạo đối tượng student từ các giá trị input
  var student = new Student(
    masv,
    tensv,
    email,
    pass,
    dateofbirth,
    khoa,
    math,
    physics,
    chemistry
  );

  // B3: Cập nhật
  // Tìm index của sinh viên muốn cập nhật
  var index = findStudent(student.masv);
  // Cập nhật
  students[index] = student;
  // Lưu thông tin sinh viên xuống localStorage
  localStorage.setItem("students", JSON.stringify(students));

  //B4: Gọi display để hiện thị lên giao diện

  display(students);
  resetForm();
}

// ================ CÁC HÀM KIỂM TRA INPUT ================//
function isRequired(value){
  if (!value)
  {
    return false;
  }
   return true;
}

function validation(){
  var masv = document.getElementById("txtMaSV").value;
  var tensv = document.getElementById("txtTenSV").value;
  var email = document.getElementById("txtEmail").value;
  var pass = document.getElementById("txtPass").value;
  var dateofbirth = document.getElementById("txtNgaySinh").value;
  var khoa = document.getElementById("khSV").value;
  var math = +document.getElementById("txtDiemToan").value;
  var physics = +document.getElementById("txtDiemLy").value;
  var chemistry = +document.getElementById("txtDiemHoa").value;

  var isValid = true;
  // Dùng Regex để tạo ra 1 chuỗi validate
  var letters = new RegExp('[a-zA-Z\-]+$');
  var emailPattern= new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$");
  var passPattern = new RegExp("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$");
  if (!isRequired(masv))
  {
    isValid=false;
    document.getElementById("spanMaSV").innerHTML = "Mã SV không được để trống"
  }
  else if (!minLength(masv,3))
  {
    isValid=false;
    document.getElementById("spanMaSV").innerHTML = "Mã SV lớn hơn 3"
  }

  if (!isRequired(tensv))
  {
    isValid=false;
    document.getElementById("spanTenSV").innerHTML = "Tên SV không được để trống"
  }
  else if (!letters.test(tensv)){
    isValid=false;
    document.getElementById("spanTenSV").innerHTML = "Tên SV có kí tự ko hợp lệ" 
  }
  
  
  if (!isRequired(email))
  {
    isValid=false;
    document.getElementById("spanEmailSV").innerHTML = "Email không được để trống"
  }
  else if (!emailPattern.test(email)){
    isValid=false;
    document.getElementById("spanEmailSV").innerHTML = "Định dạng email không hợp lệ"
  }

  if (!isRequired(pass))
  {
    isValid=false;
    document.getElementById("spanMatKhau").innerHTML = "Mật Khẩu không được để trống"
  }
  else if (!passPattern.test(pass))
  {
    isValid=false;
    document.getElementById("spanMatKhau").innerHTML = "Mật khẩu SV không đúng định dạng"
  } 
  else 
    document.getElementById("spanMatKhau").innerHTML = ""


  if (!isRequired(dateofbirth))
  {
    isValid=false;
    document.getElementById("spanNgaySinh").innerHTML = "Ngày Sinh không được để trống"
  }
  if (!isRequired(khoa))
  { 
    isValid=false;
    document.getElementById("spanKhoaHoc").innerHTML = "Khoa không được để trống"
  }
  return isValid;
}

function minLength(value,limit)
{
  if (value.length<limit)
  {
    return false
  }
  return true;
}
