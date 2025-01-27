window.onload = function () {
    const addButton = document.querySelector('input[value=Ajouter]');
    const taskfield = document.getElementById('task');
    const tasklist = document.getElementById('tasklist');
    const reButton = document.querySelector('input[value=Réinitialiser]');

    const inProgressList = document.getElementById('inProgress');
    const completedList = document.getElementById('completed');

//VERSION 1
    // addButton.onclick = function (){
    //     const item = document.createElement('li');
    //     item.innerHTML = taskfield.value;
    //     tasklist.append();
    //     tasklist.innerHTML +=`<li>${taskfield.value}</li>`;
    //     taskfield.select();
    //     $(tasklist).listview('refresh');
    // }
//VERSION 2
addButton.onclick = function () {
    if (taskfield.value.trim() === '') return;
    
    const item = document.createElement('li');
    item.innerHTML = taskfield.value;
    inProgressList.appendChild(item);
    
    // Gestionnaire pour le swipe droite (vers terminées)
    $(item).on('swiperight', function() {
        const element = this;
        $(element).addClass('termine');
        $(element).fadeOut('slow', () => {
            $(element).removeClass('termine');
            completedList.appendChild(element);
            $(element).fadeIn('slow');
            $(element).off('swiperight swipeleft').on('swipeleft', handleSwipeLeft);
            $(completedList).listview('refresh');
            $(inProgressList).listview('refresh');
        });
    });

    // Gestionnaire pour le swipe gauche (suppression)
    $(item).on('swipeleft', function() {
        const element = this;
        $(element).addClass('termine');
        $(element).fadeOut('slow', () => {
            // Supprimer l'élément après l'animation
            $(element).remove();
            $(inProgressList).listview('refresh');
        });
    });

    taskfield.value = '';
    $(inProgressList).listview('refresh');
}

// Fonction pour gérer le retour des tâches terminées
function handleSwipeLeft() {
    const element = this;
    $(element).addClass('termine');
    $(element).fadeOut('slow', () => {
        $(element).removeClass('termine');
        inProgressList.appendChild(element);
        $(element).fadeIn('slow');
        // Réattacher les gestionnaires pour les deux directions
        $(element).off('swipeleft').on('swiperight', function() {
            $(this).addClass('termine');
            $(this).fadeOut('slow', () => {
                $(this).removeClass('termine');
                completedList.appendChild(this);
                $(this).fadeIn('slow');
                $(this).off('swiperight swipeleft').on('swipeleft', handleSwipeLeft);
                $(completedList).listview('refresh');
                $(inProgressList).listview('refresh');
            });
        }).on('swipeleft', function() {
            $(this).addClass('termine');
            $(this).fadeOut('slow', () => {
                $(this).remove();
                $(inProgressList).listview('refresh');
            });
        });
        $(completedList).listview('refresh');
        $(inProgressList).listview('refresh');
    });
}


    reButton.onclick = function () {
        //VERSION 1
        // tasklist.innerHTML=' ';
        // // $(tasklist).listview('refresh');
        // taskfield.select();

        //VERSION 2
        inProgressList.innerHTML = '';
        completedList.innerHTML = '';
        taskfield.value = '';
        $(inProgressList).listview('refresh');
        $(completedList).listview('refresh');
    }
}


// $(item).on('swiperight', function(){
//     $(item).toggleClass('termine')
// })
// $(item).on('swipeleft', function(){
//     $(item).hide('slow',function(){
//         $(this).remove();
//     });
// })