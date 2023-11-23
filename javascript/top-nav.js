function navPage(className) {
    const portfolioMainContainers = document.getElementsByClassName('portfolio-main');
    const navPageContainer = document.getElementsByClassName(className + '-page');
    //const topContainer = document.getElementsByClassName('top-container');

    for (let i = 0; i < portfolioMainContainers.length; i++) {
        portfolioMainContainers[i].style.display = ''
    } 
    for (let i = 0; i < navPageContainer.length; i++) {
        navPageContainer[i].style.display = 'flex';
    }
    
    const backgroundColor = getComputedStyle(navPageContainer[0]).backgroundColor;
    //topContainer[0].style.backgroundColor  = backgroundColor;
    
}

function resetPage(className) {
    const portfolioMainContainers = document.getElementsByClassName('');
    const naPageContainer = document.getElementsByClassName(className + '-page');
    const topContainer = document.getElementsByClassName('top-container');
    
    for (let i = 0; i < naPageContainer.length; i++) {
        naPageContainer[i].style.display = 'none';
    }
    
    for (let i = 0; i < portfolioMainContainers.length; i++) {
        portfolioMainContainers[i].style.display = 'block';
    }
    topContainer[0].style.backgroundColor  = '';
}

document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("scroll-button");
    const page = document.getElementsByClassName("technical-skills")[0];
  
    button.addEventListener("click", function () {
      page.scrollIntoView({ behavior: "smooth" });
    });
  });
  
