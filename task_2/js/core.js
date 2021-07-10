class Books {
    constructor(id, title, lastname, name, secondname, countpage, year ) {
        this.id = id;
        this.title = title;
        this.lastname = lastname;
        this.name = name;
        this.secondname = secondname;
        this.countpage = countpage;
        this.year = year;
    }
}

class SmallBoock extends Books {
    constructor(id, title, lastname, name, secondname) {
        super(id, title, lastname, name, secondname);
        this.fullName = '';
        this.fio = '';
    }

    getFullName(lastname, name, secondname) {
        this.fullName = lastname + ' ' + name + ' ' + ((secondname && secondname.length > 0) ? secondname : '');
    }

    getFio(lastname, name, secondname) {
        console.log(secondname);
        if (secondname && secondname.length > 0) {
            this.fio = `${lastname}<br>${name[0]}. ${secondname[0]}.`;
        } else {
            this.fio = `${lastname} ${name[0]}.`
        }
    }

    renderSmallBook() {
        this.getFio(this.lastname, this.name, this.secondname)
        this.getFullName(this.lastname, this.name, this.secondname);

        return `<a href="#" class="books-item" data-id="${this.id}">
            <p class="books-item__author">${this.fio}</p>
            <p class="books-item__title">${this.title}</p>
        </a>
        <div class="books-info hidden" data-id="${this.id}">
            <p class="books-info__author">${this.fullName}</p>
            <p class="books-info__title">${this.title}</p>
        </div>
        `;
    }

    renderNormalBook() {
        this.getFullName(this.lastname, this.name, this.secondname);

        return ``;
    }
    
}


class RenderBooks {
    constructor(){}

    renderSmall() {
        let listHmtl = "";
        books.forEach((el) => {
            console.log(el);
            
            const bookItem = new SmallBoock(el.id, el.title, el.lastname, el.name, el.secondname, el.countpage, el.year);
            listHmtl += bookItem.renderSmallBook();
        });
        document.querySelector(".books").innerHTML = listHmtl;
    }

}




const init = () => {
    const smallList = new RenderBooks();
    smallList.renderSmall();


    const elem = document.querySelectorAll('.books-info');
    const bookElem = document.querySelectorAll('.books-item');
    bookElem.forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(el.getAttribute('data-id'));
            elem.forEach((elem) => {
                
                if(el.getAttribute('data-id') == elem.getAttribute('data-id')) {
                    if (elem.classList.contains('hidden')) {
                        elem.classList.remove('hidden');
                    } else{
                        elem.classList.add('hidden');
                    }
                    
                }
            })
        });
    });
}

window.onload = init;