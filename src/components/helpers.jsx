export function compare(bar1, bar2) {
  //color cues for comparing
  bar1.classList.add("compare");
  bar2.classList.add("compare");
}

export function swap(bar1, bar2) {
  let tmp1 = bar1.cloneNode(true);
  let tmp2 = bar2.cloneNode(true);
  bar1.dataset.value = tmp2.dataset.value;
  bar2.dataset.value = tmp1.dataset.value;
  bar1.style.height = tmp2.style.height;
  bar2.style.height = tmp1.style.height;
  bar1.classList = tmp2.classList;
  bar2.classList = tmp1.classList;
}

export function createNewSample(length, max) {
  const min = 5;
  return Array.from({ length: length }, () =>
    Math.floor(Math.random() * (max - min) + min)
  );
}
