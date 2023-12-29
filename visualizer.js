let array = [];
        const arrayContainer = document.getElementById('array-container');
        let isSorting = false;
        

        // Function to generate a new array
        function generateArray(size = 50) {
            array = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
            displayArray();
        }

        // Function to display the array
        function displayArray() {
            arrayContainer.innerHTML = '';
            array.forEach(value => {
                const bar = document.createElement('div');
                bar.style.height = `${value * 3}px`;
                bar.classList.add('array-bar');
                arrayContainer.appendChild(bar);
            });
        }
       

// Function to start sorting
async function startSorting(algorithm) {
    if (isSorting) return;
    isSorting = true;
    
            switch (algorithm) {
                case 'bubble':
                    await bubbleSort();
                    break;
                case 'selection':
                await selectionSort();
                    break;
                case 'insertion':
                    await insertionSort();
                    break;
                case 'quick':
                    await quickSort();
                    break;
                case 'merge':
                    await mergeSort();
                    break;
                
            }
            
        isSorting = false; 
    }

    
// Function to reset the array
function resetArray() {
    isSorting = false; // Immediately indicate that sorting is no longer happening
    generateArray(document.getElementById('sizeSlider').value);
}
document.getElementById('sizeSlider').oninput = function() {
    if (!isSorting){
        generateArray(this.value);
    }
};

// Function to adjust sorting speed
let speed = 50; // Default speed
document.getElementById('speedSlider').oninput = function() {
    speed = 100 - this.value; // Invert the value for intuitive control
};
function sleep() {
    return new Promise(resolve => setTimeout(resolve, speed));
}

// Call generateArray initially with default size of array
generateArray(50);




        
        // Selection Sort
        async function selectionSort() {
    for (let currIndex = 0; currIndex < array.length - 1; currIndex++) {
        if (!isSorting) return;
         
        let minIndex = currIndex;
        for (let i = currIndex + 1; i < array.length; i++) {
            if (!isSorting) return; 
            

            displayArray();
            await sleep(1);
            
            if (array[i] < array[minIndex]) {
                minIndex = i;
            }
        }
        if (minIndex != currIndex) {
            [array[currIndex], array[minIndex]] = [array[minIndex], array[currIndex]];
            displayArray();
            await sleep(5);
        }
    }
    
}

        // Insertion Sort
        async function insertionSort() {
            for (let i = 1; i < array.length; i++) {
                if (!isSorting) return;
                let currIndex = i;
                while (currIndex > 0 && array[currIndex - 1] > array[currIndex]) {
                    if (!isSorting) return;
                    [array[currIndex], array[currIndex - 1]] = [array[currIndex - 1], array[currIndex]];
                    currIndex--;
                    displayArray();
                    await sleep(50);
                }
            }
            
        }
        async function bubbleSort() {
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        
        for (let j = 0; j < n - i - 1; j++) {
            if (!isSorting) return;
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                displayArray();
                await sleep(50);
            }
        }
    }
}
async function mergeSort() {
    let aux = [...array];
    await mergeSortRecursive(array, aux, 0, array.length - 1);
}

async function mergeSortRecursive(array, aux, low, high) {
    if (high <= low || !isSorting) return;
    let mid = Math.floor(low + (high - low) / 2);
    await mergeSortRecursive(array, aux, low, mid);
    await mergeSortRecursive(array, aux, mid + 1, high);
    await merge(array, aux, low, mid, high);
}

async function merge(array, aux, low, mid, high) {
    if (!isSorting) return;
    for (let k = low; k <= high; k++) {
        aux[k] = array[k];
    }

    let i = low, j = mid + 1;
    for (let k = low; k <= high; k++) {
        if (i > mid) array[k] = aux[j++];
        else if (j > high) array[k] = aux[i++];
        else if (aux[j] < aux[i]) array[k] = aux[j++];
        else array[k] = aux[i++];

        displayArray();
        await sleep(50);
    }
}

async function quickSort() {
    await quickSortRecursive(array, 0, array.length - 1);
    isSorting=false;
}

async function quickSortRecursive(arr, low, high) {
    if (low < high && isSorting) {
        let pi = await partition(arr, low, high);
        await quickSortRecursive(arr, low, pi - 1);
        await quickSortRecursive(arr, pi + 1, high);
    }
}

async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
        if (!isSorting) return; 
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            displayArray();
            await sleep(50);
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    displayArray();
    await sleep(50);
    return i + 1;
}


       


// Updates displayArray to dynamically adjust bar widths
function displayArray() {
    arrayContainer.innerHTML = '';
    const barWidth = arrayContainer.offsetWidth / array.length - 2; // 2px for margin
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.style.height = `${value * 3}px`;
        bar.style.width = `${barWidth}px`;
        bar.classList.add('array-bar');
        arrayContainer.appendChild(bar);
    });
}
