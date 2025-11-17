document.addEventListener("DOMContentLoaded", function() { // Espera o carregamento completo do DOM

    const loadComponent = (elementId, filePath) => { // Função para carregar componentes HTML
        fetch(filePath) // Faz a requisição para o arquivo HTML
            .then(response => response.ok ? response.text() : Promise.reject('Arquivo não encontrado.')) // Verifica se o arquivo foi encontrado
            .then(data => { // Se o arquivo for carregado com sucesso
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = data; 
                }
                if (elementId === 'main-header') { 
                    
                    setupMenu();
                    updateActiveNavLink(); 
                }

            })
            .catch(error => console.error(`Erro ao carregar ${filePath}:`, error)); // Mensagem de erro no console
    };

    const setupMenu = () => { // Função para configurar o menu de navegação
        const menuIcon = document.querySelector('#menu-icon'); // Seleciona o ícone do menu
        const navMenu = document.querySelector('.nav-menu'); // Seleciona o menu de navegação

        if (menuIcon && navMenu) { // Verifica se os elementos existem
            menuIcon.onclick = () => { // Configura o clique no ícone do menu
                navMenu.classList.toggle('active'); // Alterna a visibilidade do menu
                menuIcon.classList.toggle('bx-x'); // Alterna o ícone do menu
            };
        }
    };

    const updateActiveNavLink = () => { // Função para atualizar o link ativo no menu de navegação
        const navLinks = document.querySelectorAll('.nav-menu a'); // Seleciona todos os links de navegação
        const currentPage = window.location.pathname.split('/').pop(); // Pega o nome do arquivo atual (ex: "portfolio.html")

        navLinks.forEach(link => { // Itera sobre todos os links de navegação
            const linkPage = link.getAttribute('href').split('/').pop(); // Pega o nome do arquivo do link

            // Se o nome do arquivo do link for igual ao da página atual, adiciona a classe
            if (linkPage === currentPage) { // Compara apenas o nome do arquivo
                link.classList.add('active'); // Adiciona a classe 'active'
            }
        });
    };

    // Carrega os componentes principais
    loadComponent("main-header", "_header.html"); // <<< CARREGA O HEADER
    loadComponent("main-footer", "_footer.html"); // <<< CARREGA O FOOTER TAMBÉM
});