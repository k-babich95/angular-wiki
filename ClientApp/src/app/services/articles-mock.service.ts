import { Injectable } from '@angular/core';
import { IArticle } from '../models/entities/IArticle';
import { Article } from '../models/entities/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesMockService {
  private _data: IArticle[];

  constructor() { 
    this._data = [
      {
        id: 1,
        title: "Hello world!",
        firstParagraph: "Hello world!",
        body: "First article for the app",
        imageUrl: "https://material.angular.io/assets/img/examples/shiba2.jpg",
        tags: [ { id: 1, title: "History" }]
      } as Article,
      {
        id: 2,
        title: "Gene Kranz",
        firstParagraph: "Eugene Francis Kranz (born August 17, 1933) is an American aerospace engineer, a former fighter pilot, and a retired NASA Flight Director and manager. Kranz served as NASA's second Chief Flight Director, directing missions of the Gemini and Apollo programs, including the first lunar landing mission, Apollo 11.",
        body: 'He is best known for directing the successful efforts by the Mission Control team to save the crew of Apollo 13, and was later portrayed in the major motion picture of the same name by actor Ed Harris. He is also noted for his close-cut flattop hairstyle and the dapper "mission" vests (waistcoats) of different styles and materials made by his wife, Marta Kranz, for his Flight Director missions.\r\n' +
        'A personal friend of the American astronauts of his time, Kranz remains a prominent and colorful figure in the history of U.S. manned space exploration, the embodiment of "NASA tough-and-competent" of the Kranz Dictum. Kranz has been the subject of movies, documentary films, and books and periodical articles. Kranz is a recipient of a Presidential Medal of Freedom.[1] In a 2010 Space Foundation survey, Kranz was ranked as the #2 most popular space hero.',
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Gene_kranz2.jpg",
        tags: [ { id: 4, title: "People" }]
      } as Article,
      {
        id: 3,
        title: "NASA",
        firstParagraph: 'The National Aeronautics and Space Administration (NASA, /\ˈnæsə/) is an independent agency of the United States Federal Government responsible for the civilian space program, as well as aeronautics and aerospace research.',
        body: 'NASA was established in 1958, succeeding the National Advisory Committee for Aeronautics (NACA). The new agency was to have a distinctly civilian orientation, encouraging peaceful applications in space science. Since its establishment, most US space exploration efforts have been led by NASA, including the Apollo Moon landing missions, the Skylab space station, and later the Space Shuttle. NASA is supporting the International Space Station and is overseeing the development of the Orion Multi-Purpose Crew Vehicle, the Space Launch System and Commercial Crew vehicles. The agency is also responsible for the Launch Services Program which provides oversight of launch operations and countdown management for unmanned NASA launches.\r\n' +
        'NASA science is focused on better understanding Earth through the Earth Observing System; advancing heliophysics through the efforts of the Science Mission Directorate\'s Heliophysics Research Program; exploring bodies throughout the Solar System with advanced robotic spacecraft missions such as New Horizons; and researching astrophysics topics, such as the Big Bang, through the Great Observatories and associated programs.',
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg",
        tags: [ { id: 2, title: "Space" }]
      } as Article,
    ];
  }

  public produce(): IArticle[] {
    return this._data;
  }
}
