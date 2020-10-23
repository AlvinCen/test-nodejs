getData();
async function getData(){
    const response = await fetch('/read');
    const json = await response.json();
    showData(json);
}

const btnSave = document.getElementById('btn_save');
btnSave.addEventListener('click', async event => {

    const action = btnSave.textContent;
    const id   = document.getElementById('id').value;
    const nama   = document.getElementById('nama').value;

    let data = {
        id : id,
        nama : nama,
        action : action
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    console.log(options);
    const response = await fetch('/api', options);
    const json = await response.json();
    
    getData();

    $('#exampleModal').modal('hide');

    if(action === 'Simpan'){
        $.alert('Data Berhasil ditambah!');
    }else{
        $.alert('Data Berhasil dirubah!');
    }
});

function showData(json){
    let tr = '';
    $('#databody').html('');
    let no;
    for (let i = 0; i < json.length; i++) {
        no = i + 1;
        tr = $('<tr/>');
        tr.append("<td>" + json[i].ID + "</td>");
        tr.append("<td>" + json[i].Nama_Barang + "</td>");
        tr.append(`
            <td>
                <button type="button" class="badge badge-primary badge-pill btnEdit" data-id="`+ json[i].ID +`">
                    Edit
                </button>
                <button type="button" class="badge badge-danger badge-pill btnHapus" data-id="`+ json[i].ID +`">
                    Hapus
                </button>
            </td>`
        );
        $('#databody').append(tr);
    }

    //Jquery Selector
    $(function(){
        $('.btnTambahData').on('click', function(){
            document.getElementById('id').value = '';
            document.getElementById('nama').value = '';

            $('#exampleModalLabel1').html('Tambah Data Barang');
            $('.modal-footer button[id=btn_save]').html('Simpan');
            $('#exampleModal1').modal('show');
        });

        $('.btnEdit').on('click', async function(){
            let id = $(this).data('id');
            const url = `readbyid/${id}`;
            const response = await fetch(url);
            const json = await response.json();
            document.getElementById('idbarang').readOnly = true;
            document.getElementById('idbarang').value = json._id;
            document.getElementById('namabarang').value = json.Nama_Barang;

            $('#exampleModalLabel').html('Ubah Data Barang');
            $('.modal-footer button[id=btn_save]').html('Ubah Data');
            $('#exampleModal').modal('show');
        });

        $('.btnHapus').on('click', async function(){
            let id = $(this).data('id');

            $.confirm({
                title: 'Hapus Data Barang',
                content: 'Apakah anda yaking menghapus data ini?',
                buttons: {
                    ya: {
                        text: 'YA',
                        btnClass: 'btn-blue',
                        action: async function(){
                            const url = `hapus/${id}`;
                            const response = await fetch(url);
                            const json = await response.json();
                            $.alert('Data Berhasil dihapus!');
                            getData();
                        }
                    },
                    tidak: function () {
                        
                    }
                }
            });
        });
    })
}