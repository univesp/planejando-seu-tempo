$(document).ready(function() {


  // Ações do usuário que mostram e/ou escondem o logotipo.
  // Por padrão, mostra no topo e fim da página.
  // Remova ou reescreva de acordo com o projeto.

  $(window).scroll(function() {

    var nav = $("nav");
    var scroll = $(window).scrollTop();

    // Mostra o nav quando a página está no topo
    if (scroll == 0) {
      nav.fadeIn();
      //Mostra a nav quando a página chega no fim
    } else if (scroll == $(document).height() - $(window).height()) {
      nav.fadeIn();
      //Esconde a nav
    } else {
      nav.fadeOut();
    }

  });
  // Seu código abaixo

  //Variáveis globais

  //Primeiro clique para habailitar a edição quando o usuário clicar.
  let cliqueDesabilita = true;

  //Cópias da tabela, para que o usuário não perca os dados quando clicar
  //em imprimir em branco.
  let copiaInner = [];
  let copiaValue = [];

  //Itens do HTML.
  let tabela = document.getElementById('tabela')
  let construa = document.getElementById('primeiroBotao');
  let botoes = document.getElementsByClassName('diasDaSemanaCelular');
  let imprimaEmBranco = document.getElementById('imprimaEmBranco');
  let imprimaPreenchido = document.getElementById('imprimaPreenchido');
  let limparQuadro = document.getElementById('limparQuadro');
  let textarea = document.getElementsByTagName("TEXTAREA");
  let telaInicial = document.getElementById('paginaInicial');
  let paginaTabela = document.getElementById('paginaTabela');
  let tituloTabela = document.getElementById('tituloTabela');
  let voltar = document.getElementById('voltar');
  let tituloTabelaCelular = document.getElementById('tituloTabelaCelular');
  let tituloTabelaNova320px = document.getElementById('tituloTabelaNova320px');
  let verExemplo = document.getElementById('VerExemplo');


  //Função que limpa o quadro.
  let limpeQuadro = function() {

    for (let i = 0; i < textarea.length; i++) {
      textarea[i].innerHTML = '';
      textarea[i].value = '';
      textarea[i].style.backgroundImage = 'none';
      textarea[i].style.backgroundColor = 'white';
      textarea[i].removeAttribute('readonly')
      textarea[i].removeAttribute('unselectable');
    }
  }

  //Função que faz a cópia dos dados que estão na tabela.
  let guardaQuadro = function() {
    for (let i = 0; i < textarea.length; i++) {
      copiaInner.push(textarea[i].innerHTML);
      copiaValue.push(textarea[i].value);
    }
  }

  //Função que restaura as informações da tabela.
  let restauraQuadro = function() {
    for (let i = 0; i < textarea.length; i++) {
      textarea[i].innerHTML = copiaInner[i];
      if (textarea[i].innerHTML == '')
        textarea[i].value = copiaValue[i];
    }
  }

  //Função que destrói as cópias da tabela.
  let destroiCopia = function() {
    copiaInner = [];
    copiaValue = [];
  }

  //Função que faz a navegação entre a primeira e a segunda tela.
  let navega = function() {
    if (this.id == 'primeiroBotao') {
      telaInicial.style.display = 'none';
      paginaTabela.style.display = 'flex';
      document.documentElement.scrollTop = document.innerHeight / 10;
    }
    if (this.id == 'tituloTabela' || this.id == 'tituloTabelaCelular' || this.id == 'tituloTabelaNova320px' || this.id == 'voltar') {
      telaInicial.style.display = 'flex';
      paginaTabela.style.display = 'none';
      document.documentElement.scrollTop = document.innerHeight / 10;
    }
  }

  //Função que verifica se o usuário está usando celular.
  function detectCelular() {
    if (navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    )
      return true;
    else
      return false;
  }

  //Função que não deixa o textarea ficar com scroll.
  let checkScroll = function() {
    if (this.scrollHeight > this.offsetHeight) {
      while (this.scrollHeight > this.offsetHeight) {
        this.value = this.value.substr(0, this.value.length - 1);
      }
    }
  }

  //Função que faz a navegação dos botões do celular.
  let clica = function() {
    let botoes = document.getElementsByClassName('diasDaSemanaCelular');
    for (var i = 0; i < botoes.length; i++) {
      botoes[i].style.backgroundColor = '#525158';
    }
    this.style.backgroundColor = "#3ab3d0";
    if (this.innerHTML == 'SEG') {
      $('.segunda').css('display', 'flex');
      $('.segunda').siblings().css('display', 'none');
    } else if (this.innerHTML == 'TER') {
      $('.terca').css('display', 'flex');
      $('.terca').siblings().css('display', 'none');
    } else if (this.innerHTML == 'QUA') {
      $('.quarta').css('display', 'flex');
      $('.quarta').siblings().css('display', 'none');
    } else if (this.innerHTML == 'QUI') {
      $('.quinta').css('display', 'flex');
      $('.quinta').siblings().css('display', 'none');
    } else if (this.innerHTML == 'SEX') {
      $('.sexta').css('display', 'flex');
      $('.sexta').siblings().css('display', 'none');
    } else if (this.innerHTML == 'SAB') {
      $('.sabado').css('display', 'flex');
      $('.sabado').siblings().css('display', 'none');
    } else {
      $('.domingo').css('display', 'flex');
      $('.domingo ').siblings().css('display', 'none');
    }
    $('.periodos').css('display', 'flex');
  }


  //Faz a impressão do preenchido.
  let imprimirPreenchido = function() {
    window.print();
  }

  //Limpa o quadro.
  let imprimaBranco = function() {
    guardaQuadro();
    limpeQuadro();
    window.print();
    restauraQuadro();
    destroiCopia();
  }

  //Função que restaura os exemplos originais na tabela.
  let exemplosOriginais = [
    ["9h-10h - preparar aulas semanais", "15h-17h - aula particular", "19h30-22h - estudar"],
    ["9h-10h - caminhada", "", "19h30-22h - estudar"],
    ["", "15h-17h - aula particular", "19h30-22h - estudar"],
    ["9h-10h - caminhada", "", "19h30-22h - estudar"],
    ["", "", "19h-21h - aula particular"],
    ["", "", "20h-23h - jantar fora com o marido"],
    ["9h-11h - igreja", "", ""]
  ];

  let restauraExemplo = function() {
    // Seleciona todas as colunas da tabela (exceto a coluna de períodos)
    let colunas = [
      document.querySelector('.segunda'),
      document.querySelector('.terca'),
      document.querySelector('.quarta'),
      document.querySelector('.quinta'),
      document.querySelector('.sexta'),
      document.querySelector('.sabado'),
      document.querySelector('.domingo')
    ];
    for (let i = 0; i < colunas.length; i++) {
      let textareas = colunas[i].getElementsByTagName('textarea');
      for (let j = 0; j < textareas.length; j++) {
        textareas[j].value = exemplosOriginais[i][j] || "";
        textareas[j].innerHTML = exemplosOriginais[i][j] || "";
        textareas[j].style.backgroundColor = exemplosOriginais[i][j] ? "#efefef" : "white";
        if (exemplosOriginais[i][j]) {
          textareas[j].setAttribute('readonly', 'readonly');
          textareas[j].setAttribute('unselectable', 'on');
        } else {
          textareas[j].removeAttribute('readonly');
          textareas[j].removeAttribute('unselectable');
        }
      }
    }
  }

  //Adiciona os eventos nos elementos do HTML.
  construa.addEventListener('click', navega);
  tituloTabela.addEventListener('click', navega);
  voltar.addEventListener('click',navega);
  tituloTabelaCelular.addEventListener('click', navega);
  tituloTabelaNova320px.addEventListener('click', navega);
  imprimaEmBranco.addEventListener('click', imprimaBranco);
  imprimaPreenchido.addEventListener('click', imprimirPreenchido);
  limparQuadro.addEventListener('click', limpeQuadro);
  verExemplo.addEventListener('click', restauraExemplo);
  // tabela.addEventListener('click', function() {
  //   if (cliqueDesabilita) {
  //     cliqueDesabilita = false;
  //     limpeQuadro();
  //   }
  // })

  Array.from(botoes).forEach(function(argumento) {
    argumento.addEventListener('click', clica);
  })

  //Adiciona a trava do scroll em todos os textarea.
  for (let i = 0; i < textarea.length; i++) {
    textarea[i].addEventListener('keyup', checkScroll);
    textarea[i].addEventListener('change', checkScroll);
    textarea[i].addEventListener('paste', checkScroll);
  }

})
