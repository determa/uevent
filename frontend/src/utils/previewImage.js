export default function previewImage() {
    const preview = document.getElementById("preview");
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();

    reader.addEventListener(
        "load",
        function () {
            preview.innerHTML = `<img src="${reader.result}" class="h-full w-full object-cover">`;
            preview.classList.remove("hidden");
        },
        false
    );

    if (file) {
        reader.readAsDataURL(file);
    }
}
