const API_URL = "PUT_YOUR_GOOGLE_SCRIPT_URL_HERE";

async function submitForm(e, type) {
  e.preventDefault();
  const form = e.target;
  const button = form.querySelector("button");

  button.disabled = true;
  button.innerText = "Submitting...";

  const payload = [...form.querySelectorAll("input, select")]
    .map(el => el.value.trim());

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, payload })
    });

    const data = await res.json();
    alert(data.message);
    form.reset();

  } catch {
    alert("Submission failed");
  } finally {
    button.disabled = false;
    button.innerText = "Submit";
  }
}
