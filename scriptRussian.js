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



let ListName = ["Famille", "Ecole"];

let ChoosedList = [];
let TabNombreRandom = [];
let HistoriqueBR = [];
let HistoriqueSkip = [];
let Historique = [];
let CreateChoosedList = [];
let Reponses = [0,0];
let NombreMotListe = [40,40];

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

let ListeChoisie = 0;
let NombreRandom = 0;
let LastNombreRandom = 0;
let ListeAddWordChoosed = 0;
let DeleteComfirmation = 0;
let ListeChoosed = MesListes[ListName[ListeChoisie]];
let LongueurPartie = 20;

const HistoriqueElement = document.getElementById("SkipHistory");
const InputBoxElement = document.getElementById("InputBox");
const GameProgressElement = document.getElementById("GameProgress");
const GameProgressBarElement = document.getElementById("GameProgressBar");
const ListElements = document.getElementById("SeeListConteneur");

const GameProgressBarClass = document.getElementsByClassName("GameProgressBar");

    // -------------Variables normales--------------





// ---------------------Fonctions---------------------

function SelectListButton() {

    let ListString = "";

    ListName.forEach(element => { ListString += `<button class="ListButtonInMenu" onclick="SelectList('${element}') ; ResetPartie()">${element}</button>
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

function SelectList(List) {
    let ListNumber = -1;

    ListName.forEach( element => {

            ListNumber ++;
            if (List == element) {
                ListeChoisie = ListNumber;
            }
        
        });

        ListeChoosed = MesListes[ListName[ListeChoisie]];

    SelectListButton();
    AfficheMot();

}








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
    
    ChoosedList.forEach( element => {

        ListWords += `

        <div>${element.fr} = ${element.ru}</div>

        `;
    });

    ListElements.innerHTML = `<p id="PageOpacitor" class="PageOpacitor" onclick="RefreshListElements()"></p>
        <div class="SeeListBox">
            <div class="SeeListButtonBox">
                ${ListString}
            </div>
            <div class="SeeListWordsBox">
                ${ListWords}
            </div>
        </div>
        `;

}











function CreateListButton() {

    ListElements.innerHTML = `<p id="PageOpacitor" class="PageOpacitor" onclick="RefreshListElements()"></p>
        <div class="SeeListBox">
            <div class="SeeListButtonBox">
                <button class="ListButtonInMenu" onclick="AddWordToListButton()">Add Words</button>
                <button class="ListButtonInMenu"  onclick="CreateListeMenu()">Create List</button>
                <button class="ListButtonInMenu"  onclick="DeleteListeMenu()">Delete List</button>
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

            <div>'${(ChoosedList[i]).fr}' = '${(ChoosedList[i]).ru}' <button onclick="DeleteWord('${i}')">-</button></div>

        `;
    }
    
    ListName.forEach(element => { ListString += `<button class="ListButtonInMenu" onclick="ListToAddWord('${element}')">${element}</button>
        `;  
    });

    ListElements.innerHTML = `<p id="PageOpacitor" class="PageOpacitor" onclick="RefreshListElements()"></p>
        <div class="SeeListBox">
            <div class="SeeListButtonBox">
                ${ListString}
                <input style="text" id="AddWordInput" placeholder="'Translation = Word =...'" onkeydown="if(event.key === 'Enter') AddWord()">
            </div>
            <div class="SeeListWordsBox">
                ${ListWords}
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

    const DecompositionMot = NewWordInputBox.value.split("=");

    for (i = 0; i < DecompositionMot.length; i +=2)
    {

        let NewWord = {fr: DecompositionMot[i], ru: DecompositionMot[i+1]};

        CreateChoosedList.push(NewWord);
        console.log(ListeAddWordChoosed);
        NombreMotListe[ListeAddWordChoosed] += 2;

    }
    ListToAddWord(NomListeChoisie);
    localStorage.setItem("UserList", MesListes);
    localStorage.setItem("ListWordCount", NombreMotListe);
    SaveWordList();
}

function DeleteWord(Number) {

    ChoosedList.splice(Number, 1);
    ListToAddWord(NomListeChoisie);
    NombreMotListe[ListeAddWordChoosed] -= 2;
    localStorage.setItem("ListWordCount", NombreMotListe);
    SaveWordList();

}


function CreateListeMenu() {

    ListElements.innerHTML = `<p id="PageOpacitor" class="PageOpacitor" onclick="RefreshListElements()"></p>
        <div class="SeeListBox">
            <div class="SeeListButtonBox">
                <input style="text" id="AddWordInput" placeholder="List's Name" onkeydown="if(event.key === 'Enter') CreateList()">
            </div>
        </div>
    `;

}

function CreateList() {

    const NewListeInputBox = document.getElementById("AddWordInput");


    ListElements.innerHTML = `<p id="PageOpacitor" class="PageOpacitor" onclick="RefreshListElements()"></p>
        <div class="SeeListBox">
            <div class="SeeListButtonBox">
                <input style="text" id="AddWordInput" placeholder="List's Name" onkeydown="if(event.key === 'Enter') CreateList()">
                <p>List Created !</p>
            </div>
        </div>
    `;

    if (NewListeInputBox.value !== "")
    {
    MesListes[NewListeInputBox.value] = [];
    ListName.push(NewListeInputBox.value);
    NombreMotListe.push(0);
    localStorage.setItem("ListWordCount", NombreMotListe);
    localStorage.setItem("UserLists", ListName);
    }

   

}


function SaveWordList() {

    let TousLesMots = "";

    ListName.forEach(element => {


        MesListes[element].forEach(mot => {

            TousLesMots += mot.fr + "." + mot.ru + ".";

        });

    });
    TousLesMots = TousLesMots.slice(0, -1);
    localStorage.setItem("Mots", TousLesMots);

    if (GameAlreadyPlayed == "no")
    {
        localStorage.setItem("GameAlreadyPlayed", "yes");
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

    if (DeleteComfirmation !== 0)
    {

        if (confirm == 0){
            DeleteComfirmation = 0;
                ListElements.innerHTML = `<p id="PageOpacitor" class="PageOpacitor" onclick="RefreshListElements()"></p>
            <div class="SeeListBox">
                <div class="SeeListButtonBox">
                    ${ListString}
                    <button onclick="ListToDelete('${List}', 1)">Delete</button><button onclick="ListToDelete('${List}', 2)">Cancel</button>
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
                    NombreMotListe.splice(i,1);

                }
                i++;

            });
            localStorage.setItem("UserLists", ListName);
            localStorage.setItem("ListWordCount", NombreMotListe);

            SaveWordList();
            DeleteListeMenu();

        }
    }
    else 
    {
        DeleteComfirmation = 2;
        DeleteListeMenu();
    }

}












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


    }
    else {

    }


}

function UpdateHistorique() {

    LastNombreRandom = TabNombreRandom[TabNombreRandom.length-2];
    HistoriqueElement.innerHTML ="<div>History : </div>";

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

}

function UpdateScore() {

    GameProgressElement.innerText = (Historique.length / 2) + "/20";

    //GameProgressBarElement.innerHTML = "";

   // GameProgressBarElement.style.border = "3px solid black";

    if (Historique.length /2 < LongueurPartie) {

     /*   for (i = 1; i <= Historique.length; i += 2) {

            if (Historique[i] == -1) {

                GameProgressBarElement.innerHTML += `
                    <div class="BonneReponseSquare"> *</div>
                `;
                Reponses[0] ++;

            }
            else {

                GameProgressBarElement.innerHTML += `
                    <div class="SkipReponseSquare"> *</div>
                `;
                Reponses[1] ++;

            }

        }*/
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
       

    }

}

function RefreshListElements() {

    ListElements.innerHTML = "";

}


function ResetPartie() {

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
    

}

function AfficheLastWord() {

    LastNombreRandom = TabNombreRandom[TabNombreRandom.length-2];
    const LastWordElement = document.getElementById("LastWord");

    if (TabNombreRandom.length == 1 )
    {
        LastWordElement.innerText = "Previous word : ";
    }
    else
    {

        LastWordElement.innerText = "Previous word : " + ChoosedList[LastNombreRandom].ru + " => " + ChoosedList[LastNombreRandom].fr;
    }

}

function ChangeLanguage() {

    const ModeButtonElement = document.getElementById("ModeButton");

    if (FrRu == false) {FrRu = true; ModeButtonElement.innerText = "Word-Translation";}
    else {FrRu = false; ModeButtonElement.innerText = "Translation-Word";}
    
    AfficheMot();

}

function AfficheMot() {

    const GameModeText = document.getElementById("GameMode");
    const WordBoxElement = document.getElementById("WordBox");
    ChoosedList = MesListes[ListName[ListeChoisie]];

    NombreRandom = Math.floor(Math.random() * ChoosedList.length);
    TabNombreRandom.push(NombreRandom);

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















function OnLoad() {


  //  GameProgressBarElement.style.border = "3px solid transparent";



    if (GameAlreadyPlayed == "yes") {
    
    const ListNameLocal = localStorage.getItem("UserLists").split(",");
    const MotsLocal = localStorage.getItem("Mots").split(".");
    const NombreMotListeLocal = localStorage.getItem("ListWordCount").split(",");

    ListName = [];
    
    let i = 0;
    let b = 0;
    NombreMotListe = [];

    
    NombreMotListeLocal.forEach(nombre => {
        
        NombreMotListe.push(parseInt(nombre));
        i++;

    });
    //console.log(NombreMotListe);

    ListNameLocal.forEach(element => {

        MesListes[element] = [];

    });


   for (i=0 ; i < ListNameLocal.length; i++) {
        for (j = 0; j < NombreMotListe[i] ; j += 2) {

            MesListes[ListNameLocal[i]].push({fr:`${MotsLocal[b]}`, ru:`${MotsLocal[b+1]}`});
            b+=2;
        }
        ListName.push(ListNameLocal[i]);

    };
    console.log(NombreMotListe);
    console.log(MesListes);

    }
    


}