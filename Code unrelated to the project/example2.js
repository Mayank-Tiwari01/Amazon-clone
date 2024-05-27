async function example () {
  try {
    const pro = await fetch('https://supersimplebackend.dev/products');
    
    if (!pro.ok) {
      throw new Error(`HTTP error! Status: ${pro.status}`);
    }

    const json = await pro.json();
    console.log(json);
    console.log(typeof json);
  } catch (error) {
    console.error('Failed to fetch or parse products:', error);
  }
}

example();


//using fetch to do the same thing, fetch returns a promise that resolves with a response object

fetch('https://supersimplebackend.dev/products')
.then((response) => {
  return response.json();
})
.then((response) => {
  console.log(response)
  console.log(typeof response)
})
.catch((err) => {
  console.error(err);
})
.finally(() => {
  console.log("promise consumed")
})

