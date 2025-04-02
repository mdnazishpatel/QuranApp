const Btn = document.querySelector("button");
const Input = document.querySelector("input");
const rasool = document.querySelector(".section");

function Quran(Searchvalue, callback) {
    fetch("https://api.alquran.cloud/v1/quran/en.asad")
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            if (res.data && res.data.surahs) { 
                let filteredAyahs = [];
                res.data.surahs.forEach(surah => {
                    surah.ayahs.forEach(ayah => {
                        if (ayah.text.toLowerCase().includes(Searchvalue.toLowerCase())) {
                            filteredAyahs.push({
                                surah: surah.englishName,
                                ayahNumber: ayah.numberInSurah,
                                text: ayah.text
                            });
                        }
                    });
                });

                callback(filteredAyahs);
            }
        })
        .catch(error => console.error("Error fetching Quran data:", error));
}


const showAyat = (Ayat) => {
    rasool.innerHTML = ""; 

    if (Ayat.length === 0) {
        rasool.innerHTML = `<p>No Ayahs found for this search, try another context.</p>`;
        return;
    }

    Ayat.forEach(ayah => {
        const ayatDiv = document.createElement("div");
        ayatDiv.classList.add("section")
        ayatDiv.innerHTML = `
            <h3>Surah: ${ayah.surah} (Ayah ${ayah.ayahNumber})</h3>
            <p>${ayah.text}</p>
            ✨
        `;
        rasool.appendChild(ayatDiv);
    });
};


Btn.addEventListener("click", () => {
    const searchText = Input.value.trim();
    if (searchText === "") {
        rasool.innerHTML = "<p>Please enter a word to search.</p>";
        return;
    }
    Quran(searchText, showAyat);
});

Quran("mercy", showAyat)
