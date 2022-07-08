function display() {
  // B1: DOM lấy value
  var id = document.getElementById("txtMaSV").value;
  var name = document.getElementById("txtTenSV").value;
  var type = document.getElementById("loaiSV").value;
  var math = +document.getElementById("txtDiemToan").value;
  var literature = +document.getElementById("txtDiemVan").value;
  // B2: Tạo object student (thuộc tính/ phương thức)
  var student = {
    // key: value
    id: id,
    name: name,
    type: type,
    math: math,
    literature: literature,

    calcAverageScore: function () {
      return (this.math + this.literature) / 2;
    },
    getRank: function () {
      var score = this.calcAverageScore();
      if (score >= 8) {
        return "Giỏi";
      }
      if (score >= 6.5) {
        return "Khá";
      }
      if (score >= 5) {
        return "Trung Bình";
      }

      return "Yếu";
    },
  };
  // B3: Hiển thị ra giao diện trở lại
  document.getElementById("spanTenSV").innerHTML = student.name;
  document.getElementById("spanMaSV").innerHTML = student.id;
  document.getElementById("spanLoaiSV").innerHTML = student.type;
  var score = student.calcAverageScore();
  document.getElementById("spanDTB").innerHTML = score;
  var rank = student.getRank();
  document.getElementById("spanXepLoai").innerHTML = rank;
}
