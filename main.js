const tbody = document.querySelector('tbody')

fetch(`http://localhost:3000/products`).then(res => res.json()).then((data) => {
    showProducts(data)
    document.querySelector('#thongbao').innerHTML = document.cookie
    const deleteBtns = document.querySelectorAll('.delete')
    deleteBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const confirm = window.confirm("Bạn có chắc chắn muốn xóa")
            if(confirm){
                deleteProducts(btn.dataset.id)
            }
        })
    })

    const editBtns = document.querySelectorAll('.edit')
    editBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            editProducts(btn.dataset.id)
        })
    })
})

const showProducts = (data) => {
    tbody.innerHTML = data.map((pro, index) => {
        return /*html*/`
        <tr>
            <td scope="row">${index + 1}</td>
            <td>${pro.productName}</td>
            <td><img src="${pro.image}" alt="" width="100"></td>
            <td>
                <button data-id="${pro.id}" class="btn btn-danger delete">Xóa</button>
                <button data-id="${pro.id}" class="btn btn-primary edit">Sửa</button>
            </td>
        </tr>
        `
    })
}

const deleteProducts = (id) => {
    fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE"
    }).then(() => {
        document.cookie = "Xóa Thành Công"
    })
}

const addProducts = () => {
    document.querySelector('body').innerHTML = /*html*/`
    <form class="form-group">
        <label for="">Tên</label>
        <input type="text" name="" id="ten" class="form-control">
         <span id="err_name" class="text-danger"></span> <br>
        <label for="">Ảnh</label>
        <input type="file" name="" id="" class="form-control">
        <button class="btn btn-primary" id="btn-add">Thêm</button>
      </form>
    `
    const name = document.querySelector('#ten')
    const err = true;
    document.querySelector('#btn-add').addEventListener('click', (e) => {
        e.preventDefault()
        if(name.value == ""){
            document.querySelector('#err_name').innerHTML = "Bạn chưa nhập tên"
            return err = false;
        }else{
            document.querySelector('#err_name').innerHTML = ""
        }

        if(err){
            const newProduct = {
                "productName": name.value
            }
    
            fetch(`http://localhost:3000/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProduct)
            }).then(() => {
                document.cookie = "Thêm Thành Công"
            })
        }
        
    })
}

document.querySelector('#add').addEventListener('click', addProducts)

const editProducts = (id) => {
    fetch(`http://localhost:3000/products/${id}`).then(res => res.json()).then((data) => {
        document.querySelector('body').innerHTML = /*html*/`
        <form class="form-group">
            <label for="">Tên</label>
            <input type="text" name="" id="ten" class="form-control" value="${data.productName}">
        
            <label for="">Ảnh</label>
            <input type="file" name="" id="" class="form-control">
            <button class="btn btn-primary" id="btn-add">Thêm</button>
          </form>
        `
        const name = document.querySelector('#ten')
        document.querySelector('#btn-add').addEventListener('click', (e) => {
            e.preventDefault()
    
            const newProduct = {
                "productName": name.value
            }
    
            fetch(`http://localhost:3000/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProduct)
            }).then(() => {
                document.cookie = "Sửa thành công"
            })
        })
    })
   
}

const login = () => {
    document.querySelector('body').innerHTML = /*html*/`
    <form class="form-group">
    <label for="">Tên Đăng Nhập</label>
    <input type="text"
      class="form-control" name="" id="userName">
      <span id="err_user" class="text-danger"></span>
      <label for="">Mật Khẩu</label>
    <input type="password"
      class="form-control" name="" id="pass">
      <span id="err_pass" class="text-danger"></span>
      <button id="dangnhap" class="btn btn-primary">Đăng nhập</button>
  </form>
    `
   const err = true;
    document.querySelector('#dangnhap').addEventListener('click', (e) => {
        
        const userName = document.querySelector('#userName').value
        const pass = document.querySelector('#pass').value
        e.preventDefault()
        if(userName == ""){
            document.querySelector('#err_user').innerHTML = "Bạn chưa nhập user"
            return err = false
        }else{
            document.querySelector('#err_user').innerHTML = ""
        }

        if(pass == ""){
            document.querySelector('#err_pass').innerHTML = "Bạn chưa nhập mật khẩu"
            return err = false
        }else{
            document.querySelector('#err_pass').innerHTML = ""
        }

        if(err){
            fetch(`http://localhost:3000/user`).then(res => res.json()).then((data) => {
            data.map((user) => {
                if(user.name == userName && user.password == pass){
                    document.cookie = "Đăng nhập thành công"
                    location.reload()
                }else{
                    alert('Đăng nhập thất bại')
                    document.cookie = "Đăng nhập thành công; expires=Thu, 18 Dec 2013 12:00:00 UTC";
                    document.cookie = "Đăng nhập thất bại"
                    location.reload()
                }
            })
        })
        }
        
        
    })
}

document.querySelector('#login').addEventListener('click', login)

