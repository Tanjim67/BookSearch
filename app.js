const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggleSearch = (displayStyle1, displayStyle2) => {
    document.getElementById('bookList').style.display = displayStyle1;
    document.getElementById('Count').style.display = displayStyle2;
}

const bookSearch = () => {
    const books = document.getElementById('search');
    const bookValue = books.value;



    books.value = '';

    url = `http://openlibrary.org/search.json?q=${bookValue}`

    if (bookValue === '') {
        books.setAttribute('placeholder', 'Please enter something to search');
    } else {
        toggleSpinner('block');
        toggleSearch('none', 'none');

        books.setAttribute('placeholder', 'Search');
        fetch(url)
            .then(res => res.json())
            .then(data => displayResult(data));

    }



}

const displayResult = books => {
    const list = document.getElementById('bookList');
    list.textContent = '';
    bookdoc = books.docs;

    if (books.numFound === 0) {
        const showCount = document.getElementById('Count');
        showCount.textContent = '';

        const notFound = document.getElementById('notFound')
        notFound.textContent = '';
        const div = document.createElement('div');
        // div.classList.add('row');
        div.innerHTML = `
        <h3 class="text-center text-dark font-monospace"> No Results found </h3>`

        notFound.appendChild(div);
        toggleSpinner('none');

    } else {
        const showCount = document.getElementById('Count');
        showCount.textContent = '';
        showCount.innerHTML = ` <h5> Total ${books.numFound} searches found </h5>`;
        const notFound = document.getElementById('notFound')
        notFound.textContent = '';

        bookdoc.forEach(book => {

            const div = document.createElement('div');
            div.classList.add('col');

            if (book.cover_i === undefined) {
                div.innerHTML = `
                <div class="card-body bcolor overflow-hidden">
                <img src="images/noimage.jpg" class="card-img-top img-thumbnail ymage" alt="...">
                <h4 class="card-title">${book.title}</h4>
                <h5 class="lead">Author ${book.author_name}</h5>
                <h5 class="lead">Publisher ${book.publisher}</h5>
                <h5 class="lead ">Published Year ${book.first_publish_year}</h5>
                </div>
                `;
                list.appendChild(div);
                toggleSpinner('none');
                toggleSearch('flex', 'block');

            }
            else {
                div.innerHTML = `
            <div class="card-body bcolor overflow-hidden">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-thumbnail ymage" alt="...">
            <h4 class="card-title">${book.title}</h4>
            <h5 class="lead">Author ${book.author_name}</h5>
            <h5 class="lead ">Publisher ${book.publisher}</h5>
            <h5 class="lead">Published Year ${book.first_publish_year}</h5>
            </div>
            `;
                list.appendChild(div);
                toggleSpinner('none');
                toggleSearch('flex', 'block');
            }



        });

    }

}



