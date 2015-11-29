// ajout d'évenement même pour les anciens navigateurs
var addEvent = function (element, event, func){
                    if(element.addEventListener){
                        element.addEventListener(event, func, false);
                    } else {
                        element.attachEvent ('on' + event, func);
                    }
                }

addEvent(window , 'load', function (){

    //on vérifie que le namespace AmericanNote n'existe pas déjà
    if (typeof AmericanNote === 'undefined'){
    
        var AmericanNote = {
            
            //propriété
            phpNotePath : 'php/americanNote.php',
            phpFormPath : 'php/form.php',
            
            //méthode qui initialise le script
            init : function(){
                
                var button = document.getElementById('button');
                
                AmericanNote.EventHandlers.eventClick(button);
                
            },
        
        
            // gestion des événements
            EventHandlers : {
            
                // événement click
                eventClick : function (element){
                    
                    var myForm = document.getElementById('myForm'),
                    response = document.getElementById('response'),
                    close = document.getElementById('close'),
                    button = document.getElementById('button');
                
                    addEvent (element,'click', function(){
                        
                            
                            /* Si on clique sur le bouton "notation", soit le formulaire existe, sinon on le crée */
                            if(element.id == 'button'){
                                
                                if(myForm){
                                    
                                    myForm.style.display = 'block';
                                    response.style.display = 'block';
                                    close.style.display = 'block';
                                    button.style.display = 'none';
                                    
                                } else {
                                    
                                    AmericanNote.createForm();
                                    
                                }
                                                                                                                       
                            /*Si on clique sur "close", on cache le formulaire, le bouton close, la réponse et on fait apparaitre le
                            bouton "notation" */ 
                            } else if (element.id == 'close') { 
                                
                                
                                myForm.style.display = 'none';
                                close.style.display = 'none';
                                response.style.display = 'none';
                                button.style.display = 'block';
                                
                                AmericanNote.EventHandlers.eventClick(button);
                            }                       
                        
                    });            
                },
                
                //événement change
                eventChange : function (){
                    
                    var selectMenu = document.getElementById('list');
                    
                    addEvent(selectMenu, 'change', function(e){
                        
                        var selectNote = e.target.value;
                        
                        if(selectNote !== 'default'){
                          
                            AmericanNote.setData(selectNote);
                        }
                        
                      });     
                }
            },
            
            // se charge de créer le bouton "close"
            createClose : function(){
                
                var divClose = document.createElement('div');
                divClose.id = 'close';
                divClose.innerHTML = 'Close';
                
                document.body.appendChild(divClose);
                
                AmericanNote.EventHandlers.eventClick(divClose);
                
            },
                     
            //se charge de créer le formulaire 
            createForm : function(){          
                
                var xhr = new XMLHttpRequest ();
                
                xhr.open('GET', AmericanNote.phpFormPath, true);
                         
                addEvent(xhr,'readystatechange',function(){
                    
                     if(xhr.readyState == 4 && xhr.status == 200) {
                         
                      document.body.innerHTML += xhr.responseText;
                         
                      var buttonNotation = document.getElementById('button');
                      buttonNotation.style.display = 'none';
                         
                       AmericanNote.createClose();
                     
                      AmericanNote.EventHandlers.eventChange();
                                       
                         
                    } else if (xhr.readyState == 4 && xhr.status !== 200) {
                         
                        alert('Une erreur est survenue! \n\nCode :'+ xhr.status +'readyState\n\n :'+xhr.readyState+'\nTexte: ' + xhr.statusText);
                    }
                });
                         
                
                xhr.send(null);            
                               
            },
                       
            
            setData : function(selectNote){
                
                var xhr = new XMLHttpRequest ();
                
                var value1 = encodeURIComponent(selectNote);
                
                xhr.open('GET', AmericanNote.phpNotePath+'?note='+value1, true);
                         
                addEvent(xhr,'readystatechange',function(){
                         
                    if(xhr.readyState == 4 && xhr.status == 200) {
                         
                        var element = document.getElementById('response');
                         
                        element.innerHTML =  xhr.responseText;
                        
                         
                    } else if (xhr.readyState == 4 && xhr.status !== 200) {
                         
                        alert('Une erreur est survenue! \n\nCode :'+ xhr.status +'readyState\n\n :'+xhr.readyState+'\nTexte: ' + xhr.statusText);
                    }
                });
                         
                
                xhr.send(null);
                
               AmericanNote.EventHandlers.eventChange();
        }
            
     };
    
    
} else {
    
    console.log('Ce namespace existe déjà.')
}

AmericanNote.init();

});