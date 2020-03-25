var faker = require('faker');

module.exports = () => {
  const data = { gamers: [] };

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random(min) * max);
  };

  const colors = [
    '#db2828',
    '#f2711c',
    '#fbbd08',
    '#b5cc18',
    '#21ba45',
    '#00b5ad',
    '#2185d0',
    '#6435c9',
    '#a333c8',
    '#e03997'
  ];

  for (let i = 0; i < 10; i++) {
    const mondayTotal = getRandomNumber(10, 20);
    const tuesdayTotal = getRandomNumber(10, 30);
    const wednesdayTotal = getRandomNumber(15, 30);
    const thursdayTotal = getRandomNumber(20, 40);
    const fridayTotal = getRandomNumber(30, 50);
    const saturdayTotal = getRandomNumber(50, 80);
    const sundayTotal = getRandomNumber(50, 80);

    data.gamers.push({
      id: i,
      gamer: faker.name.firstName(),
      avatar: faker.image.avatar(),
      color: i < 10 ? colors[i] : faker.internet.color(),
      scores: {
        monday: mondayTotal,
        tuesday: tuesdayTotal,
        wednesday: wednesdayTotal,
        thursday: thursdayTotal,
        friday: fridayTotal,
        saturday: saturdayTotal,
        sunday: sundayTotal
      }
    });
  }

  return data;
};
