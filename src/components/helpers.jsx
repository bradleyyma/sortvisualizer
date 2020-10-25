export function compare(bar1, bar2) {
  //color cues for comparing
  bar1.classList.add("compare");
  bar2.classList.add("compare");
}

export function swap(bar1, bar2) {
  let temp_value = bar1.dataset.value;
  let temp_height = bar1.style.height;
  bar1.dataset.value = bar2.dataset.value;
  bar2.dataset.value = temp_value;
  bar1.style.height = bar2.style.height;
  bar2.style.height = temp_height;
}

export function createNewSample(length, max) {
   const min = 5;
   return Array.from({ length: length }, () =>
     Math.floor(Math.random() * (max - min) + min)
   );
}
