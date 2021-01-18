setInterval(function () {
    $('#underscore').toggleClass('hiden');
}, 700);


$('.navigation').hide();
setTimeout(function () {
    $('.navigation').show();
}, 1700);
$('.main_container').hide();
setTimeout(function () {
    $('.main_container').show();
}, 2500);

var list_skills;
const xhttp_skills = new XMLHttpRequest();
xhttp_skills.open('GET', 'skill.json', true);

xhttp_skills.send();
xhttp_skills.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        list_skills = JSON.parse(this.responseText);
        var skills = "";
        list_skills.map(x => {
            skills += ` <div class="skill flex_v_c">
                                    <img class='img_skills' src="img/skills/${x.icon}" alt="" id="id_${x.name}">
                                    <label for="id_${x.name}">${x.name}</label>
                                </div>`;
        });
        $('#skills').html(skills);
    }
}
const xhttp_portafolio = new XMLHttpRequest();
xhttp_portafolio.open('GET', 'portafolios.json', true);

xhttp_portafolio.send();
xhttp_portafolio.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        //console.log(this.responseText);
        list_skills = JSON.parse(this.responseText);
        var skills = "";
        list_skills.map(x => {
            skills += `<div class="card">
                                  <img class="card-img-top" src="img/portafolios/img/${x.icon}.png" alt="Card image cap">
                                  <div class="card-body">
                                    <h5 class="card-title">${x.title}</h5>
                                    <p class="card-text" style='color:#3D4752;'>${x.description}</p>
                                    <button tpye='button' class="btn btn-primary" onclick="LoadModal('${x.icon}')" style='width:100px'>Read more</button>
                                  </div>
                                </div>`;
        });
        $('#portafolios').html(skills);
    }
}

function LoadModal(id_app) {
    const xhttp_portafolio2 = new XMLHttpRequest();
    xhttp_portafolio2.open('GET', 'portafolios.json', true);

    xhttp_portafolio2.send();
    xhttp_portafolio2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            list_skills = JSON.parse(this.responseText);
            list_skills.map(x => {
                if (id_app == x.icon) {
                    $('#title_app').html(`<b>${x.title}</b>`);
                    $('#img_app').attr('src', 'img/portafolios/videos/' + x.icon + '.gif');
                    $('#descrip').html(x.description);
                    $('#descrip_extend').html(x.descrip_extend);
                    let tecnologys = x.tecnologys.split(":");
                    var html_tec = "<b>";
                    var flag = 0;
                    tecnologys.map(tec => {
                        if (flag == 0) {
                            html_tec += `${tec}`;
                            flag = 1;
                        } else
                            html_tec += ` - ${tec}`;
                    });

                    html_tec += "</b>";
                    $('#tecnologys').html(html_tec);
                }
            });
        }
    }
    $('#modal_app').modal('show');
}

/*
$('.btn_toggle').hide();
function PantallaChica() {
    if (window.outerWidth < 420) {
        $('.btn_toggle').show();
        $('.options').hide();
    } else {
        $('.btn_toggle').hide();
        $('.options').show();
    }
}
function ToggleBar() {
    $('#options').slideToggle('fast');
}
*/
function WindowResize() {
    if (window.outerWidth < 500) {
        $('.component').addClass('centrado');

        /*$('#skills').removeClass('flex_h_c');*/
        /*$('#skills').addClass('flex_v_c');*/
        $('#skills').removeClass('container');

        $('#contacts').removeClass('flex_h_c');
        $('#contacts').addClass('centrado');
        $('#contacts').addClass('flex_v_c');
    } else {
        $('.component').removeClass('centrado');

        /*$('#skills').removeClass('flex_v_c');*/
        /*$('#skills').addClass('flex_h_c');*/
        $('#skills').addClass('container');

        $('#contacts').removeClass('centrado');
        $('#contacts').removeClass('flex_v_c');
        $('#contacts').addClass('flex_h_c');
    }
}

WindowResize();
$(window).resize(function () {
    WindowResize();
});


function validEmail(email) {
    var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var regOficial = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (reg.test(email) && regOficial.test(email)) {
        return true;
    } else if (reg.test(email.value)) {
        return true;
    } else {
        return false;

    }
}

function SendMessage() {
    var name = $('#name').val();
    var mail = $('#mail').val();
    var reason = $('#reason').val();
    var message = $('#message').val();

    var complete = "";
    if (name == "" || name == " " || name == "  " || name == "   ") {
        complete += "your name - ";
    }
    if (!validEmail(mail) || mail == "" || mail == " " || mail == "  ") {
        complete += "e-Mail - ";
    }
    if (reason == "" || name == " " || name == "  " || name == "   ") {
        complete += "the reason - ";
    }
    if (message == "" || name == " " || name == "  " || name == "   ") {
        complete += "the message - ";
    }

    if (complete != "") {
        swal({
            title: "COMPLETE",
            text: complete,
            type: "warning"
        });
    } else {
        var form = $('#form_send').serialize();
        $.ajax({
            //url: 'https://systick.grupo-gestion.com.ar/ws_MovInApp/prueba_mails.php',
            url: 'http://localhost/Portafolio/php/mails.php',
            type: 'POST',
            data: form,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Aguarde unos instantes",
                    showConfirmButton: false
                });
            },
            success: function (result) {
                console.log(result);
                $('#modal_app').modal('hide');
                swal({
                    title: "SENT",
                    text: "Thank you very much for contacting me",
                    type: "success"
                });
                $('#name').val("");
                $('#mail').val("");
                $('#reason').val("");
                $('#message').val("");
            },
            error: function (jqXHR, estado, error) {
                console.log(estado);
                console.log(error);
                console.log(jqXHR);
                swal({
                    title: "EMAIL NOT SENT",
                    text: "Please contact us by other means or try again later. Contact e-mail: nacho.mambo@gmail.com ",
                    type: "error"
                });
            }
        });
    }
}
