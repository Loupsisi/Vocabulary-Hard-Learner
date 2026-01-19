// ---------------------Variables--------------------
    // -----------------Listes de mots----------------

let MesListes = {};

MesListes["Ecole"] = [
    {fr: "École", ru: "Школа"},
    {fr: "Professeur", ru: "Учитель"},
    {fr: "Élève", ru: "Ученик"},
    {fr: "Livre", ru: "Книга"},
    {fr: "Cahier", ru: "Тетрадь"},
    {fr: "Stylo", ru: "Ручка"},
    {fr: "Crayon", ru: "Карандаш"},
    {fr: "Sac à dos", ru: "Рюкзак"},
    {fr: "Tableau", ru: "Доска"},
    {fr: "Classe", ru: "Класс"},
    {fr: "Examen", ru: "Экзамен"},
    {fr: "Leçon", ru: "Урок"},
    {fr: "Devoirs", ru: "Домашнее задание"},
    {fr: "Bibliothèque", ru: "Библиотека"},
    {fr: "Université", ru: "Университет"},
    {fr: "Langue", ru: "Язык"},
    {fr: "Mathématiques", ru: "Математика"},
    {fr: "Histoire", ru: "История"},
    {fr: "Bureau", ru: "Письменный стол"},
    {fr: "Diplôme", ru: "Диплом"}
];

MesListes["Famille"] = [
    {fr: "Famille", ru: "Семья"},
    {fr: "Mère", ru: "Мать"},
    {fr: "Père", ru: "Отец"},
    {fr: "Parents", ru: "Родители"},
    {fr: "Fils", ru: "Сын"},
    {fr: "Fille", ru: "Дочь"},
    {fr: "Frère", ru: "Брат"},
    {fr: "Soeur", ru: "Сестра"},
    {fr: "Grand-père", ru: "Дедушка"},
    {fr: "Grand-mère", ru: "Бабушка"},
    {fr: "Oncle", ru: "Дядя"},
    {fr: "Tante", ru: "Тётя"},
    {fr: "Cousin", ru: "Двоюродный брат"},
    {fr: "Cousine", ru: "Двоюродная сестра"},
    {fr: "Enfant", ru: "Ребёнок"},
    {fr: "Mari", ru: "Муж"},
    {fr: "Femme, épouse", ru: "Жена"},
    {fr: "Petit-fils", ru: "Внук"},
    {fr: "Petite-fille", ru: "Внучка"},
    {fr: "Neveu", ru: "Племянник"}
];

let MesConteneurs = {}; 

MesConteneurs["Russian"] = ["Famille", "Ecole"];


let ListName = ["Famille", "Ecole"];

let ChoosedList = [];
let TabNombreRandom = [];
let HistoriqueBR = [];
let HistoriqueSkip = [];
let Historique = [];
let CreateChoosedList = [];
let ConteneurList = ["Russian"];
let Reponses = [0,0];

let SelectListLock = false;
let SeeListLock = false;
let CreateListLock = false;
let AddWordToListButtonsLock = false;
let ListToAddWordLick = false;
let FrRu = false;

let GameAlreadyPlayed = localStorage.getItem("GameAlreadyPlayed") || "no";
console.log(GameAlreadyPlayed);
let SeeListHTML = "";
let Answer = "";
let ListString = "";
let NomListeChoisie ="";
let ConteneurListString = "";
let ConteneurToDelete = "";
let WordMode = "EveryWord";

let ListeChoisie = 0;
let NombreRandom = 0;
let LastNombreRandom = 0;
let ListeAddWordChoosed = 0;
let DeleteComfirmation = 0;
let ListeChoosed = MesListes[ListName[ListeChoisie]];
let LongueurPartie = 20;

const HistoriqueElement = document.getElementById("SkipHistory");
const InputBoxElement = document.getElementById("InputBox");
let GameProgressElement = document.getElementById("GameProgress");
const GameProgressBarElement = document.getElementById("GameProgressBar");
const ListElements = document.getElementById("SeeListConteneur");

const GameProgressBarClass = document.getElementsByClassName("GameProgressBar");



// ---------------------Fonctions---------------------

//----------------------------------------Fonction OnLoad-----------------------------------------------

function OnLoad() {


  //  GameProgressBarElement.style.border = "3px solid transparent";






    if (GameAlreadyPlayed == "yes") {
    
        const ListNameLocal = localStorage.getItem("UserListsName");
        const MesListesLocal = localStorage.getItem("UserLists");
        const ConteneurContent = localStorage.getItem("MesConteneursSaved");
        const ConteneursNomLocal = localStorage.getItem("ListConteneurSaved");
        
        if (ConteneurContent) {

            MesConteneurs = JSON.parse(ConteneurContent);
        }

        
        if (ConteneursNomLocal) {

            ConteneurList = JSON.parse(ConteneursNomLocal);
        }

        if (ListNameLocal) {

            ListName = JSON.parse(ListNameLocal);

        }

        if (MesListesLocal) {

            MesListes = JSON.parse(MesListesLocal);

        }
    }

}

// ----------------------------------------------------------------------------------------------
// ----------------------------Fonctions Principales, rafraichissement + calculs-----------------------------------------
// ----------------------------------------------------------------------------------------------


function GetAnswer() {

    Answer = InputBoxElement.value;
    Answer = Answer.replaceAll(" ", "").replace("-", "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    CheckAnswer();

}

function CheckAnswer() {

    let ToutesReponsesFr = [];

    if (FrRu == false) {

        ToutesReponsesFr = ListeChoosed[NombreRandom].fr.replace("-", "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(",");
    }
    else 
    {
        ToutesReponsesFr = ListeChoosed[NombreRandom].ru.replace("-", "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(",");

    }

    let ReponseFr = ToutesReponsesFr.some(reponse => {

        return reponse.replace("-", "").replaceAll(" ", "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === Answer;

    });
    

    if (ReponseFr) {
        
        InputBoxElement.value = "";
        HistoriqueBR.push(NombreRandom);
        Historique.push(NombreRandom); Historique.push(-1);
        UpdateScore();
        UpdateHistorique();
        AfficheMot();
        Reponses[0] ++;


    }
    else {

    }


}

function UpdateHistorique() {

    LastNombreRandom = TabNombreRandom[TabNombreRandom.length-2];
    HistoriqueElement.innerHTML ="";

    if (Historique.length !== 0) {
        console.log(Historique);
        for (i = Historique.length-1; i >= 1; i -= 2) {

            if (Historique[i] == -1) {

                HistoriqueElement.innerHTML += `
                    <div class="BonneReponse">${ChoosedList[Historique[i-1]].ru} => ${ChoosedList[Historique[i-1]].fr}</div>
                `;

            }
            else {

                HistoriqueElement.innerHTML += `
                    <div class="SkipReponse">${ChoosedList[Historique[i-1]].ru} => ${ChoosedList[Historique[i-1]].fr}</div>
                `;

            }

        }
    }else {

        HistoriqueElement.innerHTML += `History : `;
    }

}


function UpdateGameLength(Number) {

    

    if (LongueurPartie + Number > 0 && LongueurPartie + Number <= 100 && (LongueurPartie + Number) > (Historique.length / 2))
    {
        LongueurPartie += Number
        GameProgressElement.innerText  = (Historique.length / 2) + "/" + LongueurPartie;
        
    }

}

function UpdateScore() {

    GameProgressElement = document.getElementById("GameProgress");

    GameProgressElement.innerText = (Historique.length / 2) + "/" + LongueurPartie;

    //GameProgressBarElement.innerHTML = "";

   // GameProgressBarElement.style.border = "3px solid black";

    if (Historique.length /2 < LongueurPartie) {

        for (i = 1; i <= Historique.length; i += 2) {

            if (Historique[i] == -1) {

              //  GameProgressBarElement.innerHTML += `
              //      <div class="BonneReponseSquare"> *</div>
              //  `;
                

            }
            else {

              //  GameProgressBarElement.innerHTML += `
             //       <div class="SkipReponseSquare"> *</div>
              //  `;
                

            }

        }
    }
    else {
        let Gagner = "";
        
        if (Reponses[0] > Reponses[1])
            {
                Gagner = "Good job ! You Won !";

            }
        else if (Reponses[0] == Reponses[1])
            {
                Gagner = "Hhmmm... you can do better.";
            }
        else 
            {
                Gagner = "You lost...";

            }

           

        

        ListElements.innerHTML = `<p id="PageOpacitor" class="PageOpacitor"></p>
        <div class="SeeListBox">
            <div class="Resultat">${Gagner}</div>
            <div>${Reponses[0]}/${LongueurPartie}</div>
            <div class="SeeListButtonBox">
                <button class="ListButtoninMenu" onclick="ResetPartie()">Restart</button>
            </div>

        </div>
        `;
       
        Reponses[0] = 0; Reponses[1] = 0;
    }

}

function RefreshListElements() { // Sert à déafficher les menus 

    ListElements.innerHTML = "";

}

function ResetPartie() { // Reset d'a peu près tout

    Historique= [];
    TabNombreRandom = [];
    UpdateScore();
    UpdateHistorique();
    AfficheMot();
    RefreshListElements();



}

function Skip() { 

    InputBoxElement.value = "";
    HistoriqueSkip.push(NombreRandom);
    Historique.push(NombreRandom); Historique.push(-2);
    AfficheMot();
    UpdateHistorique();
    UpdateScore();
    Reponses[1] ++;
    

}

function AfficheLastWord() {

    LastNombreRandom = TabNombreRandom[TabNombreRandom.length-2];
    const LastWordElement = document.getElementById("LastWord");

    if (TabNombreRandom.length == 1 )
    {
        LastWordElement.innerText = "";
    }
    else
    {

        LastWordElement.innerText = ChoosedList[LastNombreRandom].ru + " => " + ChoosedList[LastNombreRandom].fr;
    }

}

function NombreGenerator() {

    NombreRandom = Math.floor(Math.random() * ChoosedList.length);

    if (WordMode == "EveryWord") {

        if (TabNombreRandom.length >= ChoosedList.length-1)
        
        {
            TabNombreRandom = [];
            TabNombreRandom.push(NombreRandom);
            return true;
        }

        if (TabNombreRandom.indexOf(NombreRandom) == -1)
        {
            TabNombreRandom.push(NombreRandom);
            return true;
        }
        else {
            console.log("false");
            return false;
        }

    }
    else {

        TabNombreRandom.push(NombreRandom);
        return true;

    }


}

function AfficheMot() {

    const GameModeText = document.getElementById("GameMode");
    const WordBoxElement = document.getElementById("WordBox");
    ChoosedList = MesListes[ListName[ListeChoisie]];

    if (ChoosedList.length == 0){

        WordBoxElement.innerText = "The list is empty !";
    }
    else {

       


        if (NombreGenerator() == true)
        {
            

            if (FrRu == false)
            {
                WordBoxElement.innerText = `${ChoosedList[NombreRandom].ru}`;
            }
            else {

                WordBoxElement.innerText = `${ChoosedList[NombreRandom].fr}`;

            }
            GameModeText.innerText = `Current List : ${ListName[ListeChoisie]}`;

            AfficheLastWord();

        }
        else {

            AfficheMot();

        }
        
        

    }

}


// ----------------------------------------------------------------------------------------------
// ----------------------------Fonctions Boutons & Menus-----------------------------------------
// ----------------------------------------------------------------------------------------------

// ----------------------------Bouton Select---------------------------------------------------

function SelectListButton() {

    ListString = "";

    ListName.forEach(element => { ListString += `<button class="ListButtonInMenu" onclick="SelectList('${element}')">${element}</button>
        `;  
    });

    ListElements.innerHTML = `<p id="PageOpacitor" class="PageOpacitor" onclick="RefreshListElements()"></p>
    <div class="SeeListBox">
        <div class="SeeListButtonBox">
            ${ListString}
        </div>
    </div>
    `;

}

function OnlyEmptyLists() {

    let nombre = 0;

    ListName.forEach(element => {

        if (MesListes[element].length == 0 || MesListes[element].length === null) {

            nombre +=0

        }
        else {

            nombre = 1;
        }

    });

    if (nombre !== 0) {

        return true
    }
    else {

        return false
    }

}

function SelectList(List) {
    let ListNumber = -1;

    if (OnlyEmptyLists())
    {
        ListName.forEach( element => {

            ListNumber ++;
            if (List == element) {
                if (MesListes[List].length !== 0) {
                    ListeChoisie = ListNumber;
                    //ListeChoosed = MesListes[ListName[ListeChoisie]];
                    ListeChoosed = MesListes[List];
                    localStorage.setItem("ChoosedListSaved", List);
                    ResetPartie();
                }
                else 
                {
                    ListElements.innerHTML = `<p id="PageOpacitor" class="PageOpacitor" onclick="RefreshListElements()"></p>
                    <div class="SeeListBox">
                        <div class="SeeListButtonBox">
                            ${ListString}
                        </div>
                        <div>This List is empty !</div>
                    </div>
                    `;
                }
                
            }
        
        });
    }
    else {
        const GameModeText = document.getElementById("GameMode");

        GameModeText.innerText = "Current List : All Lists are empty !"
    }



}

// ----------------------------Bouton See Lists-----------------------------------------

function SeeListButton() {

    SeeListHTML = "";
    ListString = "";

    ListName.forEach(element => { ListString += `<button class="ListButtonInMenu" onclick="SeeList('${element}')">${element}</button>
        `;  
    });

    ListElements.innerHTML = `<p id="PageOpacitor" class="PageOpacitor" onclick="RefreshListElements()"></p>
    <div class="SeeListBox">
        <div class="SeeListButtonBox">
            ${ListString}
        </div>
    </div>
    `;
    SeeListHTML = `${ListString}`;

}

function SeeList(List) {

    let ListNumber = -1;
    let SeeListChoosed = 0;
    let ListWords = "";

    ListName.forEach( element => {

        ListNumber ++;
        if (List == element) {
            SeeListChoosed = ListNumber;
        }
    
        });

    let ChoosedList = MesListes[ListName[SeeListChoosed]];
    let NbList = -1;
    
    if (ChoosedList.length !== 0)
    {
         ChoosedList.forEach( element => {

            ListWords += `

            <tr>
                <td>${element.fr}</td>
                <td>${element.ru}</td>
            </tr>

            `;
        });

     ListElements.innerHTML = `<p id="PageOpacitor" class="PageOpacitor" onclick="RefreshListElements()"></p>
        <div class="SeeListBox">
            <div class="SeeListButtonBox">
                ${ListString}
            </div>
            <div class="
            
            sBox">
                <table class="
                
                Table">
                    <tr>
                        <th>Word</th>
                        <th>Translation</th>
                    </tr>
                        ${ListWords}
                </table>
            </div>
        </div>
        `;

    }
    else {

        ListElements.innerHTML = `<p id="PageOpacitor" class="PageOpacitor" onclick="RefreshListElements()"></p>
        <div class="SeeListBox">
            <div class="SeeListButtonBox">
                ${ListString}
            </div>
            <div>This list is empty...<div>
        </div>
        `;

    }

   

   
}

// ----------------------------Bouton List Modification-----------------------------------------

function CreateListButton() {

    ListElements.innerHTML = `<p id="PageOpacitor" class="PageOpacitor" onclick="RefreshListElements()"></p>
        <div class="SeeListBox">
            <div class="SeeListButtonBox">
                <button class="ListButtonInMenu" onclick="AddWordToListButton()">Add Words</button>
                <button class="ListButtonInMenu"  onclick="CreateListeMenu()">Create List</button>
                <button class="ListButtonInMenu"  onclick="DeleteListeMenu()">Delete List</button>
                <button class="ListButtonInMenu"  onclick="ManageListMenu()">Reorder Lists</button>
            </div>
        </div>
    `;
    
}

function AddWordToListButton() {

    let ListString = "";
    CreateListLock = false;

    ListName.forEach(element => { ListString += `<button class="ListButtonInMenu" onclick="RefreshListElements() ; ListToAddWord('${element}')">${element}</button>
        `;  
    });

    ListElements.innerHTML = `<p id="PageOpacitor" class="PageOpacitor" onclick="RefreshListElements()"></p>
    <div class="SeeListBox">
        <div class="SeeListButtonBox">
            ${ListString}
        </div>
    </div>
    `;


}

function ListToAddWord(List) {

    let ListWords = "";
    ListString = "";
    let SeeListChoosed = 0;
    let ListNumber = -1;



    ListName.forEach( element => {

        ListNumber ++;
        if (List == element) {
            SeeListChoosed = ListNumber;
        }
    
        });

    ListeAddWordChoosed = SeeListChoosed;

    ChoosedList = MesListes[ListName[SeeListChoosed]];
    NomListeChoisie = ListName[SeeListChoosed];


    for (i = 0; i < ChoosedList.length; i++) {

        ListWords += `
            <tr>
                <td>${(ChoosedList[i]).fr}</td> <td>${(ChoosedList[i]).ru}</td><td class="DeleteWordButton"><button class="DeleteWordButton" onclick="DeleteWord('${i}')">-</button></td>
            </tr>
        `;
    }
    
    ListName.forEach(element => { ListString += `<button class="ListButtonInMenu" onclick="ListToAddWord('${element}')">${element}</button>
        `;  
    });

    ListElements.innerHTML = `<p id="PageOpacitor" class="PageOpacitor" onclick="RefreshListElements()"></p>
        <div class="SeeListBox">
            <div class="SeeListButtonBox">
                ${ListString}
            </div>
            <input style="text" id="AddWordInput" class="AddWordInput" placeholder="Translation = Word =..." onkeydown="if(event.key === 'Enter') AddWord()">
            <div class="
            
            sBox">
                <table class=
                
                Table>
                    ${ListWords}
                </table>
            </div>
        </div>
        `;

    ListNumber = -1;
    let NbList = -1;

    ListName.forEach( element => {

            ListNumber ++;
            if (List == element) {
                CreateChoosedList = MesListes[element];
            }
        
    });

}

function AddWord() {

    const NewWordInputBox = document.getElementById("AddWordInput");

    let DecompositionMot = [""];

    DecompositionMot = NewWordInputBox.value.split("=");
    const Index = DecompositionMot.lastIndexOf();


    for (i = 0; i < DecompositionMot.length; i +=2)
    {

        let NewWord = {fr: (DecompositionMot[i] || "Missing"), ru: (DecompositionMot[i+1] || "Missing")};

        CreateChoosedList.push(NewWord);
        console.log(ListeAddWordChoosed);

    }
    ListToAddWord(NomListeChoisie);
    localStorage.setItem("UserList", JSON.stringify(MesListes));


}

function DeleteWord(Number) {

    ChoosedList.splice(Number, 1);
    ListToAddWord(NomListeChoisie);
    localStorage.setItem("UserList", JSON.stringify(MesListes));



}

function CreateListeMenu() {

    ListElements.innerHTML = `<p id="PageOpacitor" class="PageOpacitor" onclick="RefreshListElements()"></p>
        <div class="SeeListBox">
            <div class="SeeListButtonBox">
                <input style="text" id="AddListInput" class="AddListInput" placeholder="List's Name" onkeydown="if(event.key === 'Enter') CreateList()">
            </div>
        </div>
    `;

}

function DoesListAlreadyExist(List) {
    
    if (ListName.indexOf(`${List}`) == -1)
    {
        return true;
    }
    else 
    {
        return false;
    }

}

function CreateList() {

    const NewListeInputBox = document.getElementById("AddListInput");


    if (NewListeInputBox.value !== "")
    {
        if (DoesListAlreadyExist(NewListeInputBox.value))
        {

            ListElements.innerHTML = `<p id="PageOpacitor" class="PageOpacitor" onclick="RefreshListElements()"></p>
                <div class="SeeListBox">
                    <div class="SeeListButtonBox">
                        <input style="text" id="AddListInput" class="AddListInput" placeholder="List's Name" onkeydown="if(event.key === 'Enter') CreateList()">
                        <p>List Created !</p>
                    </div>
                </div>
            `;
             MesListes[NewListeInputBox.value] = [];
            ListName.push(NewListeInputBox.value);

            localStorage.setItem("UserListsName", JSON.stringify(ListName));
            localStorage.setItem("UserLists", JSON.stringify(MesListes));
        }
        else {
            ListElements.innerHTML = `<p id="PageOpacitor" class="PageOpacitor" onclick="RefreshListElements()"></p>
                <div class="SeeListBox">
                    <div class="SeeListButtonBox">
                        <input style="text" id="AddListInput" class="AddListInput" placeholder="List's Name" onkeydown="if(event.key === 'Enter') CreateList()">
                        <p>List already exists !</p>
                    </div>
                </div>
            `;

        }


       
    }

   

}


function DeleteListeMenu() {

    ListString= "";
    DeleteComfirmation = 2;

    ListName.forEach(element => { ListString += `<button class="ListButtonInMenu" onclick="ListToDelete('${element}', 0)">${element}</button>
        `;  
    });

    ListElements.innerHTML = `<p id="PageOpacitor" class="PageOpacitor" onclick="RefreshListElements()"></p>
    <div class="SeeListBox">
        <div class="SeeListButtonBox">
            ${ListString}
        </div>
    </div>
    `;



}

function ListToDelete(List, confirm) {

    if (confirm == 1 ) {DeleteComfirmation =1;}

    ListString = "";

    ListName.forEach(element => { 
        
        if (element == List) {

                ListString += `<button onclick="ListToDelete('${List}', 1)">Delete</button><button class="ListButtonInMenu" onclick="ListToDelete('${element}', 0)">${element}</button><button onclick="ListToDelete('${List}', 2)">Cancel</button>
            `;
        }

        else {

                ListString += `<button class="ListButtonInMenu" onclick="ListToDelete('${element}', 0)">${element}</button>
            `;

        }  

        
   
    });

        if (confirm == 0){

            DeleteComfirmation = 0;
                ListElements.innerHTML = `<p id="PageOpacitor" class="PageOpacitor" onclick="RefreshListElements()"></p>
            <div class="SeeListBox">
                <div class="SeeListButtonBox">
                    ${ListString}
                </div>
            </div>
            `;

        }
        else if (confirm == 2) {
            DeleteComfirmation = 2;
            DeleteListeMenu();
        }
        else if (confirm == 1) {
            DeleteComfirmation = 1;
            let i = 0;

            delete MesListes[List];
            ListName.forEach (element => {

                if (List == element)
                {
                    ListName.splice(i, 1);

                }
                i++;

            });
            localStorage.setItem("UserListsName", JSON.stringify(ListName));
            localStorage.setItem("UserLists", JSON.stringify(MesListes));

            DeleteListeMenu();

        }

}

function ManageListMenu() {
    let ConteneurString = "";
    ListString = "";

    const Input = ` <input style="text" id="AddListInput" class="AddListInput" placeholder="Conteneur's Name" onkeydown="if(event.key === 'Enter') CreateConteneur()">
        `;
    if (ConteneurList.length != 0) {
        ConteneurList.forEach(element => { 
            
            if (ConteneurToDelete != "")
            {
                if (ConteneurToDelete == element)
                {
                    ConteneurString += `<div><button class="ListButtonInMenu" onclick="DisplayConteneurList('${element}')">${element}</button><button onclick="DeleteConteneur('${element}')">delete</button></div>`;  
                }
                else {

                    ConteneurString += `<button class="ListButtonInMenu" onclick="DisplayConteneurList('${element}')">${element}</button>`;  
                }
                
            }
            else {

                ConteneurString += `<button class="ListButtonInMenu" onclick="DisplayConteneurList('${element}')">${element}</button>`;  

            }
        });
    }   

    ListElements.innerHTML = `<p id="PageOpacitor" class="PageOpacitor" onclick="RefreshListElements()"></p>
        <div class="SeeListBox">
            ${Input}
            <div class="SeeListButtonBox">
            
                ${ConteneurString}
            </div>
            ${ConteneurListString}
        </div>
    `;

    ConteneurToDelete="";
    ConteneurListString="";

}

function CreateConteneur() {

    const NewListeInputBox = document.getElementById("AddListInput");

    if (NewListeInputBox.value !== "")
    {
        if (DoesConteneurAlreadyExist(NewListeInputBox.value)){

            ConteneurList.push(`${NewListeInputBox.value}`);
            MesConteneurs[`${NewListeInputBox.value}`] = [];
            ManageListMenu();

        }
        else {



        }
    }

    localStorage.setItem("ListConteneurSaved", JSON.stringify(ConteneurList));
    localStorage.setItem("MesConteneursSaved", JSON.stringify(MesConteneurs));


}
    


function DoesConteneurAlreadyExist(value) {

    if (ConteneurList.indexOf(value) == -1) {

        return true
    }
    else {

        return false
    }


}
    

function DisplayConteneurList(Conteneur) {
    ConteneurListString="";

    ConteneurToDelete=Conteneur;

    if (MesConteneurs[Conteneur] != null)
        {
        ListName.forEach(list => {

            if (IsListInConteneur(Conteneur, list) == true) {

                ConteneurListString += `
                <tr>
                    <td>${list}</td><td class="ListInConteneur"><button class="ListInConteneur" onclick="AddListToConteneur('${Conteneur}', '${list}', 0)">-</button></td>
                </tr>
            `;

            }
            else {

                ConteneurListString += `
                <tr>
                    <td>${list}</td><td class="ListNotInConteneur"><button class="ListNotInConteneur" onclick="AddListToConteneur('${Conteneur}','${list}', 1)">+</button></td>
                </tr>
            `;

            }

        });
    }
    else {
        MesConteneurs[Conteneur] = [];
    }

    ManageListMenu();

}

function IsListInConteneur(conteneur, list) {
    let Bool = false;

    if (MesConteneurs[conteneur].length != 0){

    
        MesConteneurs[conteneur].forEach(element => {

            if (Bool == true)
            {
                return true
            }
            else {

                if (element == list)
                {
                    Bool = true;
                }
                else {

                    Bool = false;
                }
            }

        });

    }

    return Bool
}

function AddListToConteneur(Conteneur, List, Answer) {

    if (Answer == 0){

        MesConteneurs[Conteneur].splice((MesConteneurs[Conteneur]).indexOf(List), 1); 

    }
    else {

        MesConteneurs[Conteneur].push(List);

    }
    DisplayConteneurList(Conteneur);

    localStorage.setItem("MesConteneursSaved", JSON.stringify(MesConteneurs));

}

function DeleteConteneur(Conteneur) {

    delete MesConteneurs[Conteneur]
    ConteneurList.splice(ConteneurList.indexOf(Conteneur), 1);

    localStorage.setItem("MesConteneursSaved", JSON.stringify(MesConteneurs));
    localStorage.setItem("ListConteneurSaved", JSON.stringify(ConteneurList));

    ManageListMenu();

}




// ----------------------------Bouton translation - Word-----------------------------------------

function ChangeLanguage() {

    const ModeButtonElement = document.getElementById("ModeButton");

    if (FrRu == false) {FrRu = true; ModeButtonElement.innerText = "Word-Translation";}
    else {FrRu = false; ModeButtonElement.innerText = "Translation-Word";}
    
    AfficheMot();

}

// ----------------------------Bouton Every word-----------------------------------------

function GameModeChanger() {


    const GameModeButton = document.getElementById("ModeChangerButton");

    if (WordMode == "EveryWord") {

        GameModeButton.innerText = "Random Word";
        WordMode= "RNG";

    }
    else {

        GameModeButton.innerText = "Every Word";
        WordMode= "EveryWord";

    }

}

// ----------------------------Boutons Longueur partie-----------------------------------------

function GameLengthButton() {
    const GameLengthElement = document.getElementById("GameLengthBox");

    const String = `
        <div class="GameLengthButtonBox">
            <button class="GameLengthButton" onclick="UpdateGameLength(${10})">+10</button>
            <button class="GameLengthButton" onclick="UpdateGameLength(${5})">+5</button>
        </div>
        <button id="GameProgress" class="GameProgress" onclick="GameLengthButton()">${Historique.length / 2}/${LongueurPartie}</button>
        <div class="GameLengthButtonBox">
            <button class="GameLengthButton" onclick="UpdateGameLength(${-5})">-5</button>
            <button class="GameLengthButton" onclick="UpdateGameLength(${-10})">-10</button>
        </div>
    `;
    
    if (GameLengthElement.innerHTML == String)
    {
        console.log("haha");
        GameLengthElement.innerHTML = `<button id="GameProgress" class="GameProgress" onclick="GameLengthButton()">${Historique.length / 2}/${LongueurPartie}</button>`;
    }
    else {
        console.log("blabla");
        GameLengthElement.innerHTML = String;  
    }

    
    GameProgressElement = document.getElementById("GameProgress");
}
    