const albuns = [
    {
      id: "1",
      nome: "Elis & Tom",
      artista: "Elis Regina & Tom Jobim"
    },
    {
      id: "2",
      nome: "Acabou Chorare",
      artista: "Novos Baianos"
    },
    {
      id: "3",
      nome: "Clube da Esquina",
      artista: "Milton Nascimento & Lô Borges"
    }
  ];
  
  
  
  const container = document.getElementById("album-container");
  const listaFavoritos = document.getElementById("lista-favoritos");
  
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
      const li = document.createElement("li");
      li.textContent = `${album.nome} - ${album.artista}`;
      listaFavoritos.appendChild(li);
    });
  }
  
  function criarAlbumCard(album) {
    const div = document.createElement("div");
    div.className = "album";
  
    div.innerHTML = `
      <img src="${album.imagem}" alt="${album.nome}">
      <h3>${album.nome}</h3>
      <p>${album.artista}</p>
      <button class="favorito-btn" data-id="${album.id}">♡</button>
    `;
  
    const botao = div.querySelector(".favorito-btn");
    const favoritos = carregarFavoritos();
  
    if (favoritos.includes(album.id)) {
      botao.classList.add("ativo");
      botao.textContent = "❤️";
    }
  
    botao.addEventListener("click", () => {
      let favoritos = carregarFavoritos();
      if (favoritos.includes(album.id)) {
        favoritos = favoritos.filter(id => id !== album.id);
        botao.classList.remove("ativo");
        botao.textContent = "♡";
      } else {
        favoritos.push(album.id);
        botao.classList.add("ativo");
        botao.textContent = "❤️";
      }
      salvarFavoritos(favoritos);
      atualizarListaFavoritos();
    });
  
    container.appendChild(div);
  }
  
  // Inicialização
  albuns.forEach(criarAlbumCard);
  atualizarListaFavoritos();
  