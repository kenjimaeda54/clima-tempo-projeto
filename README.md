# clima-tempo-projeto.
Projeto consumindo API,yahoo do clima e tempo.

### Uso da API da yahoo,clima e tempo
  
 
## Tabelas de conteudos 
* Visão geral
  * <a href='#Desafio' >  Desafio </a>
  * <a href='#Construção' >  Construção </a>   
  * <a href='#o-que-eu-aprendi' >  Aprendizado </a>
  * <a href='#Feature' >  Feature </a>
  * <a href='#Dependencias'> Dependencias </a>

## Visão Geral
## Desafio
- Criar uma aplicação aonde usuário perceba os campos interativos, retorne o clima atual e previsão para os próximos dois dias

## Construção
  - React
  - Styled Component
  - Type Script
  - JSX
  

## O que eu aprendi
 Fortaleci meus conhecimentos no consumo de API,type script e React Native


Toda aplicação, foco foi em composição usando o principio design de Software Atomics [desing Atomics](https://atomicdesign.bradfrost.com/chapter-2/) </br>

UUtiizei  [SVG chart](https://github.com/JesperLekland/react-native-svg-charts) para criação dos gráficos, meu array</br>
 weekDay conjunto de strings,formatLabel aceita apenas numero </br>
entao usei o indice do data que contem os numeros da temperatura é utilizei como parâmetro no weekDay,</br>
assim retorno os dias da semana de acordo com o índice da temperatura, garantindo fidelidade nos dado

~~~jsx
   <XAxis
          data={data}
          formatLabel={(value, index) => weekDay[index]}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 9, fill: "blue", fontFamily: fonts.Kanit_Medium }}
          style={style.axiosX}
        />
 ~~~

 O retorno dos days eram em inglês, uma solução para esta situação era usar aqueles IF e else. Ou seja se Mon formata para Segunda, </br>
 se for Tue formata para Terça. Com objetos literais eu criei objeto, aonde as chaves são o retorno da API e o seu valor o dia formatado.</br> 
 Usando a funcao getFormatedDay, passei parâmetro, este parametro será automático, de acordo com o dia atual que o usuário acessou aplicação,e</br> 
 também retornarei os 2 próximos dias, aquela famosa previsão do tempo, no meu caso são para 3 dias. </br>
 Parâmetro recebido será retornado formatado, porque ao receber day, acesso as chaves do objeto com week[day] </br>
 
 ```typeScript
   
  const weekDay = filterWeekCurrent?.map((days) => {
        const week = {
          Mon: "Seg",
          Tue: "Ter",
          Wed: "Quar",
          Thu: "Quin",
          Fri: "Sex",
          Sat: "Sab",
          Sun: "Dom",
        } as unknown as string;
        const getFormatedDay = (day: string) => {
          return week[day as any] && week[day as any];
        };
        const dayCurrent = days.day;
        return getFormatedDay(dayCurrent);
      }) as string[];

 ```
 Api retornava varias days,mas intencao da aplicacao era pegar apenas os 3 primieras datas</br> 
 solucao,era receber o dia atual em getDay,proximo dia em getTomorrow e por fim ultimo dia em getAfterTomorrow</br>
 se esses dias forem verdadeiro no objeto da Api vou retornar apenas 3 objetos correpondente ao mês quero</br>
 sem utlizar includes ficaria repleto de or .
 
 
  ```typeScript
      const getDay = new Date().getDay();
      const getTomorrow = new Date().getDay() + 1;
      const getAfterTomorrow = new Date().getDay() + 2;
      const weekCurrent = fetchRequestCelsius?.forecasts.filter((weeks) => {
        if (
          [
            dayWeek(getDay),
            dayWeek(getTomorrow),
            dayWeek(getAfterTomorrow),
          ].includes(weeks.day)
        ) {
          return weeks;
        }
      });
  
 ```
  Utilizei novamente o arquivo .env para guardar arquivos sensiveis.No arquivo nao precisa tipar a variavel,apenas o valor</br>
  e precisa ser em maiculo para poder acessar
  

  ```typescript
  const { TOKEN } = process.env;
const { HOST } = process.env;

/*---------------------------------  */
  
#precisa do token da api para efetuar as requisicoes 
TOKEN=

/*----------------------------------*/

 const options = {
      method: "GET",
      url: "https://yahoo-weather5.p.rapidapi.com/weather",
      params: { location: params, format: "json", u: "c" },
      headers: {
        "x-rapidapi-key": `${TOKEN}`,
        "x-rapidapi-host": `${HOST}`,
      },
    } as AxiosRequestConfig;
    axios
      .request(options)
      .then((response) => {
        setFetchRequestCelsius(response.data);
        setMountedCelsius(true);
      })


  ```

 # Feature
  - Hooks
  - styled component
  - Atomics
  - Media Screen
  - Tipagem
 
 ### Dependencias
 - [App loading](https://docs.expo.io/versions/latest/sdk/app-loading/)
 - [Google Fonts](https://docs.expo.io/guides/using-custom-fonts/#using-a-google-font)
 - [Axios](https://github.com/axios/axios)
 - [React Native](https://reactnavigation.org/docs/getting-started/)
 - [Stack Stack](https://reactnavigation.org/docs/hello-react-navigation)
 - [Graficos SVG](https://github.com/JesperLekland/react-native-svg-charts)
 - [Count Up](https://github.com/vydimitrov/use-count-up)
