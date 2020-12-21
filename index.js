const body_div = document.getElementById("body-container")
const slider = document.getElementById("slider_num")
const numDisplay_p = document.getElementById("numElem")
const sortingArea_div = document.getElementById("sortingPlace")

const bubble_div = document.getElementById("bubble")
const merge_div = document.getElementById("merge")
const insertion_div = document.getElementById("insertion")
const random_div = document.getElementById("random")
const reset_div = document.getElementById("reset")

const description_p = document.getElementById("description")

var nums = null;
var num = 3;

bars(null, null)

reset_div.onclick = function(){
    (function(w){w = w || window; var i = w.setInterval(function(){},100000); while(i>=0) { w.clearInterval(i--); }})(/*window*/);
    nums = shuffle_array(nums)
    drawBars(null, null)
    description_p.innerText = "Welcome To the Sorting Visualizer. Pick one of the above options to get a description and a visual example of the sorting type"
    
}
bubble_div.onclick = function(){
    bubble_sort(nums)
}
merge_div.onclick = function(){
    description_p.innerText = "merege"
    merge_sort()
}
insertion_div.onclick = function(){
    description_p.innerText = "insertion"
    insertion_sort()
}
random_div.onclick = function(){
    description_p.innerText = "random"
    random_sort()
}



slider.onchange = function(){
    (function(w){w = w || window; var i = w.setInterval(function(){},100000); while(i>=0) { w.clearInterval(i--); }})(/*window*/);
    bars()
}

function getNum(){
    numDisplay_p.innerText = "Number of Elements: " + slider.value;
    num = parseInt(slider.value)
    nums = []
    for (let i = 1; i < num+1; i++){
        nums.push(i)
    }
}
function drawBars(pos, pos2){
    sortingArea_div.innerHTML = ""
    var barWidth = parseInt(sortingArea_div.clientWidth/num)-1
    for (let i = 0; i< num; i++){
        let barHeight = 600/num*nums[i]
        let bar = document.createElement("p")
        if (i === pos){bar.setAttribute("style", "width:"+barWidth+"px; height:" +barHeight+ "px; background-image: linear-gradient(cyan,blue);")}
        else if (i === pos2){bar.setAttribute("style", "width:"+barWidth+"px; height:" +barHeight+ "px; background-image: linear-gradient(lightslategray,blueviolet);")}
        else{bar.setAttribute("style", "width:"+barWidth+"px; height:" +barHeight+ "px; background-color:cadetblue;")}
        bar.classList.add("bar")
        sortingArea_div.append(bar)
    }
}

function bars(){
    getNum()
    nums = shuffle_array(nums)
    drawBars(null,null)
}

function shuffle_array(arr){
    for (let i = 0; i < arr.length; i++){
        let randPos = Math.floor(Math.random()*arr.length);
        let val = arr[randPos]
        arr[randPos] = arr[i]
        arr[i] = val
    }
    return arr
}

function checkSorted(arr){
    var prevThing = 0;
    for (let i = 0; i < arr.length; i++){
        if (arr[i] < prevThing){
            return false
        }
        else{
            prevThing = arr[i]
        }
    }
    return true
}

function bubble_sort(){
    num = parseInt(slider.value)
    description_p.innerText = "Bubble Sort \n Bubble Sort is a based off of comparing two adjacent values, and switching them if they are not is order \n This has a max time complexity of O(n^2)";
    let maxTime = num**2;
    var interval = setInterval(function(){
        if (!checkSorted(nums)){
            let i = 1;
            var interval2 = setInterval(function(){
                if (nums[i] < nums[i-1]){
                    let val = nums[i]
                    nums[i] = nums[i-1]
                    nums[i-1] = val;
                    drawBars(i, i-1)
                } 
                if (!(i<nums.length)){
                    clearInterval(interval2)
                }
                else{
                    i++
                }
            })

        }
        else{
            clearInterval(interval)
        }
    })
}

function merge_sort(){
    description_p.innerText = "Merge sort \n Merge Sort is based off of repeatedly dividing the array into two halves until they are small enough to be sorted effectively and then merging the sorted arrays back togerther \n the time complextiy is always O(n*log(n)) \n *Note that this is not an accurate representation of merge sort, but configured to be displayed"
    let span = 2
    let interval = setInterval(function(){
        if (checkSorted(nums)){
            clearInterval(interval)
        }
        else{
            for (let i = 0; i <= nums.length-span; i+=span){
                mergeArrays(nums.slice(i,i+span/2), nums.slice(i+span/2, i+span))
            }
            drawBars()
            span = span*2
        }
        let i = 0;
        let interval2 = setInterval(function(){
            if (nums[i] > nums[i+1]){
                clearInterval(interval2)
                if (i >= 50){
                    mergeArrays(nums.slice(0, i), nums.slice(i, nums.length))
                    drawBars()
                    }
            }
            else{
                i++
            }
        })
        
    }, 250)
    
}

// function merge_sort(){
//     description_p.innerText = "Merge sort \n Merge Sort is based off of repeatedly dividing the array into two halves until they are small enough to be sorted effectively and then merging the sorted arrays back togerther \n the time complextiy is always O(n*log(n))"
//     merge(nums)
//     drawBars(null,null)
// }
// function merge(arr){
//     if (arr.length > 1){
//         return mergeArrays(merge(arr.slice(0, arr.length/2)), merge(arr.slice(arr.length/2, arr.length)))
//     }
//     else{
//         return arr
//     }
// }

function mergeArrays(fHalf, sHalf){
    for (let i = 0; i < sHalf.length; i++){
        let elem = sHalf[i]
        if (elem > fHalf[fHalf.length-1]){
            fHalf.push(elem)
        }
        else if (elem < fHalf[0]){
            fHalf.splice(0,0,elem)
        }
        else{
            for (let j = 0; j < fHalf.length; j++){
                if (fHalf[j]>elem){
                    fHalf.splice(j, 0, elem)
                    break
                }
            }
        }
    }
    updateNums(fHalf)
    return fHalf
}

function updateNums(arr){
    let fPos = -1
    for (let i = 0; i < nums.length; i++){
        for (let j =0; j < arr.length; j++){
            if (arr[j] == nums[i]){
                fPos = i
                break
            }
        }
        if (fPos != -1){
            break
        }
    }
    for (let i = fPos; i < fPos + arr.length; i++){
        nums[i] = arr[i-fPos]        
    }
}



function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}  

function insertion_sort(){
    let curPos = 0
    description_p.innerText = "Insertion Sort \n Insertion sort is based off having two parts of the array, one sorted part and one unsorted part. Then one element is taken from the unsorted and put in the 'right' place in the sorted part until the entire array is sorted. The Time complexity is at max O(n^2)"
    let interval = setInterval(function(){
        if (checkSorted(nums)){
            clearInterval(interval)
        }
        else{
            let i = 0
            let interval2 = setInterval(function(){
                if (i >= curPos){
                    clearInterval(interval2)
                }
                else{
                    if (nums[curPos] < nums[i]){
                        let val = nums[curPos]
                        nums.splice(curPos, 1)
                        nums.splice(i, 0, val)
                    }
                    i++
                }
            })
            curPos++
        }
        drawBars(curPos, null)
        if (curPos > num){
            curPos = 0
        }
    })
}

function random_sort(){
    description_p.innerText = "Randomizes array until sorted, REALLY NOT RECOMMENDED, MAX LIKE 6 ELEMENTS \n The time complexity is O(n*n!) "
    let interval = setInterval(function(){
        nums = shuffle_array(nums)
        drawBars()
        if (checkSorted(nums)){
            clearInterval(interval)
        }
    })

}