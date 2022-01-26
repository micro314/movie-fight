const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
    root.innerHTML = `
        <label><b>Search</b></label>
        <input class="input" />
        <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
        </div>
        <div id="target"></div>
    `;

    const input = root.querySelector('.input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

    const showDropdown = () => {
        dropdown.classList.add('is-active');
    }
    const hideDropdown = () => {
        dropdown.classList.remove('is-active');
    }

    const onInput = async event => {
        const items = await fetchData(event.target.value);
        if (!items.length) {
            hideDropdown();
            return;
        }

        resultsWrapper.innerHTML = '';
        showDropdown();
        for (let item of items) {
            const option = document.createElement('a');
            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);
            option.addEventListener('click', () => {
                hideDropdown();
                input.value = inputValue(item);
                onOptionSelect(item);
            });
            resultsWrapper.appendChild(option);
        }
    }

    input.addEventListener('input', debounce(onInput, 500));
    document.addEventListener('click', event => {
        if (!root.contains(event.target)) {
            hideDropdown();
        }
    });
};