class Books {
    constructor(id, title, lastname, name, secondname, countpage, year ) {
        this.id = id;
        this.title = title;
        this.lastname = lastname;
        this.name = name;
        this.secondname = secondname;
        this.countpage = countpage;
        this.year = year;
        this.fullName = '';
    }

    getFullName(lastname, name, secondname) {
        this.fullName = lastname + ' ' + name + ' ' + ((secondname && secondname.length > 0) ? secondname : '');
    }

    render() {
        this.getFullName(this.lastname, this.name, this.secondname);
        return `<div class="desc">
            <h1>${this.title}</h1>
            <h2>${this.fullName}</h2>
            <p>Всего страниц: ${this.countpage} стр.</p>
            <p>Год написания: ${this.year} г.</p>
        </div>
        `
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
        if (secondname && secondname.length > 0) {
            this.fio = `${lastname}<br>${name[0]}. ${secondname[0]}.`;
        } else {
            this.fio = `${lastname} ${name[0]}.`
        }
    }

    renderElem() {
        this.getFio(this.lastname, this.name, this.secondname)
        this.getFullName(this.lastname, this.name, this.secondname);

        return `
        <a href="#" class="books-item" data-id="${this.id}">
            <p class="books-item__author">${this.fio}</p>
            <p class="books-item__title">${this.title}</p>
        </a>
        <a class="books-info hidden" data-id="${this.id}">
            <p class="books-info__author">${this.fullName}</p>
            <p class="books-info__title">${this.title}</p>
        </a>
        `;
    }

}


class RenderBooks {
    constructor(){}

    renderElem() {
        let listHmtl = "";
        books.forEach((el) => {
            const bookItem = new SmallBoock(el.id, el.title, el.lastname, el.name, el.secondname, el.countpage, el.year);
            listHmtl += bookItem.renderElem();
        });
        document.querySelector(".books").innerHTML = listHmtl;
    }

    renderInfoBlock(id) {
        console.log(id)
        let listHmtl = "";
        const filtered = books.filter(el => el.id == id);
        filtered.forEach((el) => {
            const item = new Books(el.id, el.title, el.lastname, el.name, el.secondname, el.countpage, el.year);
            listHmtl += item.render();
        });
        document.querySelector('.desc').innerHTML = listHmtl;
    }

}




const init = () => {
    const smallList = new RenderBooks();
    smallList.renderElem();


    const elem = document.querySelectorAll('.books-info');
    const bookElem = document.querySelectorAll('.books-item');
    const desc = document.querySelector('.desc');
    bookElem.forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            if(desc.classList.contains('hidden')) {
                desc.classList.remove('hidden');
            }
            
            elem.forEach((elem) => {
            elem.classList.add('hidden');
                if(el.getAttribute('data-id') == elem.getAttribute('data-id')) {
                    elem.classList.add('toggle');
                    elem.classList.toggle('hidden');
                }
            });
            smallList.renderInfoBlock(el.getAttribute('data-id'));
        });
    });
    elem.forEach((e) => {
        e.addEventListener('click', (ev) => {
            ev.preventDefault();
            e.classList.toggle('hidden');
            if(!desc.classList.contains('hidden')) {
                desc.classList.add('hidden');
            }
        })
    })
}

window.onload = init;