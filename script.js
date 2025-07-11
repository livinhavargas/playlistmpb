const albuns = [
  { id: 1, nome: "Elis & Tom", artista: "Elis Regina e Tom Jobim" },
  { id: 2, nome: "Construção", artista: "Chico Buarque" },
  { id: 3, nome: "Clube da Esquina", artista: "Milton Nascimento e Lô Borges" }
];


let contadorId = albuns.length + 1;

const container = document.getElementById("album-container");
const listaFavoritos = document.getElementById("lista-favoritos");
const form = document.getElementById("form-musica");
const inputTitulo = document.getElementById("titulo-musica");
const inputArtista = document.getElementById("artista-musica");
const contadorTotal = document.getElementById("total-cliques");

function getTotalCliques() {
  return parseInt(localStorage.getItem("totalCliquesMPB")) || 0;
}

function incrementarTotalCliques() {
  const total = getTotalCliques() + 1;
  localStorage.setItem("totalCliquesMPB", total);
  contadorTotal.textContent = total;
}

function atualizarContadorVisual() {
  contadorTotal.textContent = getTotalCliques();
}


function carregarFavoritos() {
  return JSON.parse(localStorage.getItem("favoritosMPB")) || [];
}

function salvarFavoritos(favoritos) {
  localStorage.setItem("favoritosMPB", JSON.stringify(favoritos));
}

function atualizarListaFavoritos() {
  const favoritos = carregarFavoritos();
  listaFavoritos.innerHTML = "";
  favoritos.forEach(id => {
    const album = albuns.find(a => a.id === id);
    if (album) {
      const li = document.createElement("li");
      li.textContent = `${album.nome} - ${album.artista}`;
      listaFavoritos.appendChild(li);
    }
  });
}

function criarAlbumCard(album) {
  const div = document.createElement("div");
  div.className = "album";

  div.innerHTML = `
    <h3>${album.nome}</h3>
    <p>${album.artista}</p>
    <button class="favorito-btn material-icons" data-id="${album.id}">favorite_border</button>
  `;

  const botao = div.querySelector(".favorito-btn");
  const favoritos = carregarFavoritos();

  if (favoritos.includes(album.id)) {
    botao.classList.add("ativo");
    botao.textContent = "favorite";
  
  }

  //  EventListener que alterna o estado de favorito ao clicar no botão
  botao.addEventListener("click", () => {
    let favoritos = carregarFavoritos();

    if (favoritos.includes(album.id)) {
      favoritos = favoritos.filter(id => id !== album.id);
      botao.classList.remove("ativo");
      botao.textContent = "favorite_border";
    } else {
      favoritos.push(album.id);
      botao.classList.add("ativo");
      botao.textContent = "favorite";
    }
    incrementarTotalCliques();
    salvarFavoritos(favoritos);
    atualizarListaFavoritos();

  });

  container.appendChild(div);
}

// EventListener para adicionar nova música manualmente
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = inputTitulo.value.trim();
  const artista = inputArtista.value.trim();

  if (nome && artista) {
    const novoAlbum = {
      id: contadorId++,
      nome,
      artista
    };
    albuns.push(novoAlbum);
    criarAlbumCard(novoAlbum);
    inputTitulo.value = "";
    inputArtista.value = "";
  }
});

// Inicialização
albuns.forEach(criarAlbumCard);
atualizarListaFavoritos();
atualizarContadorVisual(); // exibe o valor salvo no início

//modo escuro
const botaoTema = document.getElementById("toggle-tema"); //botao

function aplicarTemaSalvo() {
  const tema = localStorage.getItem("temaMPB");
  if (tema === "escuro") {
    document.body.classList.add("modo-escuro");
    botaoTema.textContent = "Modo Claro";
  } else {
    botaoTema.textContent = "Modo Escuro";
  } 
}

function aplicarTemaSalvo () {
  
}
botaoTema.addEventListener("click", () => {
  document.body.classList.toggle("modo-escuro");

  const modoEscuroAtivo = document.body.classList.contains("modo-escuro");
  localStorage.setItem("temaMPB", modoEscuroAtivo ? "escuro" : "claro");

  botaoTema.textContent = modoEscuroAtivo ? "Modo Claro" : "Modo Escuro";
});

aplicarTemaSalvo();