const weather = {};
weather.getSearchValue = () => document.getElementsByName('address')[0].value;
weather.getWeather = async () => {
    const value = weather.getSearchValue();
    const reqUrl = `http://localhost:3000/weather?address=${value}`;
    try {
      const res =   await fetch(reqUrl);
      const data =  await res.json();
      const weather = JSON.stringify(data,null,10);
      const resContainer = document.querySelector('#weather');
      resContainer.innerHTML = weather;
    } catch (e) {
        console.log(e)
    }
};
