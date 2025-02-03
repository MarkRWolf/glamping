import { useState, useEffect } from "react";

const infoData = {
  home: {
    infoTitle: "Kom og prøv glamping hos Gitte!",
    description: `Vi er stolte af at byde dig velkommen til Gitte's Glamping, hvor hjertevarme og omsorg møder
        naturens skønhed og eventyr. Vores dedikerede team, anført af Gitte selv, er her for at
        skabe den perfekte ramme om din lusuriøse udendørsoplevelse. Vi stræber efter at skabe
        minder og fordybelse, uanset om du besøger os som par, familie eller soloeventyrer. Vi
        tilbyder en bred vifte af aktiviteter og arrangementer, der passer til alle aldre og
        interesser. Udforsk naturen, slap af ved bålet, del historier med nye venner, eller find
        indre ro med vores wellnessaktiviteter.`,
  },
  aktiviteter: {
    infoTitle: "Ingen skal kede sig hos Gitte",
    description: `Glamping er mere end blot en indkvartering - det er en mulighed for at fordybe dig i naturen og skabe minder, der varer livet ud. Uanset om du foretrækker en ventyrlig kanotur, en oplysende naturvandring, hjertevarm samvær omkring bålet, smagfulde oplevelser som vinsmagning eller morgenyoga, der giver dig indre ro og balance i naturens skød - vil vi hos Gittes Glamping imødekomme dine ønsker.`,
  },
  ophold: {
    infoTitle: "Vi har ophold til enhver smag",
    description: `Vores glampingophold er skabt til at tilbyde en kombination af eventyr og afslapning. Det er den ideelle flugt fra byens støj og stress, og det perfekte sted at genoplade batterierne i en naturskøn indstilling. Book dit ophold i dag og giv dig selv lov til at fordybe dig i naturen og nyde luksus i det fri. Vi ser frem til at byde dig velkommen til en oplevelse fyldt med komfort, eventyr og skønhed.`,
  },
  kontakt: {
    infoTitle: "Vil du booke et ophold? \n Eller har du blot et spørgsmål?",
    description: `Så tøv ikke med at tage kontakt til os herunder. Vi bestræber og på at svare på henvendelser indenfor 24 timer, men op til ferier kan der være travlt, og svartiden kan derfor være op til 48 timer.`,
  },
  minliste: {
    infoTitle: "Antal aktiviteter på listen:",
    description: ``,
  },
};

const heroData = {
  home: { title: "Glamping", subTitle: "Gittes", pictureUrl: "./image_00.jpg" },
  ophold: { title: "Vores Ophold", pictureUrl: "./image_01.jpg" },
  aktiviteter: { title: "Aktiviteter", pictureUrl: "./image_04.jpg" },
  kontakt: { title: "Kontakt", pictureUrl: "./image_03.jpg" },
  minliste: { title: "Min Liste", pictureUrl: "./image_05.jpg" },
};

const useInfo = (location) => {
  const [info, setInfo] = useState(infoData["home"]);
  const [heroInfo, setHeroInfo] = useState(heroData["home"]);

  useEffect(() => {
    const key = location.split("/")[1] || "home";
    const nestedKey = location.split("/")[2];
    const infoKey = nestedKey ? `${key}/${nestedKey}` : key;

    const fetchData = async () => {
      if (!nestedKey) {
        setInfo(infoData[infoKey]);
        setHeroInfo(heroData[infoKey] || heroData["home"]);
        return;
      }

      try {
        const res = await fetch(`https://glamping.onrender.com/api/${infoKey}`);
        const result = await res.json();
        const data = result.data;

        if (!res.ok) {
          setInfo(infoData[key]);
          setHeroInfo(heroData[key] || heroData["home"]);
          return;
        }

        setInfo({ infoTitle: data.infoTitle, description: data.description });
        setHeroInfo({ title: data.title, pictureUrl: data.pictureUrl });
      } catch (error) {
        console.error("Error fetching data: ", error);
        setInfo({ infoTitle: "404", description: "Opholdet du leder efter eksisterer ikke" });
        setHeroInfo(heroData[key] || heroData["home"]);
      }
    };
    fetchData();
  }, [location]);

  return { info, heroInfo };
};

export default useInfo;
