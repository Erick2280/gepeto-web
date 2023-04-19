import { Injectable } from '@angular/core';
import { ArtStyle } from '../openai-api/openai-api.service';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  selectedCharacters: Character[] = []
  scenarioDescription: string = '';
  selectedArtStyle?: ArtStyle;
  plot: string = '';

  constructor() { }
}

export interface Character {
  name: string;
  description: string;
  imageUrl?: string;
}

export const STATIC_CHARACTERS: Character[] = [
  {
    name: 'Mônica',
    description: '',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/4/43/Monica_%28Mauricio_de_Sousa_Produ%C3%A7%C3%B5es%29.png'
  },
  {
    name: 'Magali',
    description: '',
    imageUrl: 'https://www.imagenspng.com.br/wp-content/uploads/2015/06/turma-da-monica-magali-04.png'
  },
  {
    name: 'Cebolinha',
    description: '',
    imageUrl: 'https://i.pinimg.com/originals/2c/b1/4e/2cb14ed932192452a69f63f19fe98ee2.png'
  },
  {
    name: 'Cascão',
    description: '',
    imageUrl: 'https://i.pinimg.com/originals/70/86/59/7086599d560f759f9080ba50e3dbb163.png'
  },
  {
    name: 'Galinha Pintadinha',
    description: '',
    imageUrl: 'https://www.imagenspng.com.br/wp-content/uploads/2015/04/Galinha-Pintadinha-2-1012x1024.png'
  },
  {
    name: 'Peppa Pig',
    description: '',
    imageUrl: 'https://i.pinimg.com/originals/94/18/6b/94186bcd2fadec05417f6a90b5ba15fc.png'
  },
  {
    name: 'Bob Esponja',
    description: '',
    imageUrl: 'https://www.pintarcolorear.org/wp-content/uploads/2015/09/bob-esponja.png'
  },
  {
    name: 'Homem-Aranha',
    description: '',
    imageUrl: 'https://pngfre.com/wp-content/uploads/spider-man-10-1-1024x796.png'
  },
  {
    name: 'Frozen',
    description: '',
    imageUrl: 'https://i.pinimg.com/originals/90/04/7d/90047deaa0fb3c0ef682e63887d7ca4d.png'
  },
  {
    name: 'Super Homem',
    description: '',
    imageUrl: 'https://www.freepnglogos.com/uploads/superman-png/super-hero-ice-cream-batman-wonder-woman-superman-11.png'
  },
  {
    name: 'Totoro',
    description: '',
    imageUrl: 'https://www.pngmart.com/files/12/My-Neighbor-Totoro-PNG-Photos.png'
  },
  {
    name: 'Goku',
    description: '',
    imageUrl: 'https://www.pngmart.com/files/3/Dragon-Ball-Goku-PNG-Free-Download.png'
  },
  {
    name: 'Naruto',
    description: '',
    imageUrl: 'https://i.pinimg.com/originals/74/45/6c/74456c2bd47666329b9dee5dcad4ece7.png'
  },
  {
    name: 'Ben 10',
    description: '',
    imageUrl: 'https://jogosdeben10.com/images/gallery/112.png'
  },
  {
    name: 'Pocoyo',
    description: '',
    imageUrl: 'https://i.pinimg.com/originals/90/20/dc/9020dcb602d95db1548c0649038d956b.png'
  },
  {
    name: 'Minions',
    description: '',
    imageUrl: 'https://www.pngmart.com/files/12/Group-Minions-PNG-Photos.png'
  },
  {
    name: 'Dora, a Aventureira',
    description: '',
    imageUrl: 'https://imagensemoldes.com.br/wp-content/uploads/2020/07/Dora-the-Explorer-Dora-a-Aventureira-PNG.png'
  },
  {
    name: 'Capitão América',
    description: '',
    imageUrl: 'https://i2.wp.com/www.multarte.com.br/wp-content/uploads/2019/03/capitao-america-png3.png?fit=695%2C1024&ssl=1'
  },
  {
    name: 'Thor',
    description: '',
    imageUrl: 'https://www.pngplay.com/wp-content/uploads/8/Thor-Cape-PNG-Clipart-Background.png'
  },
  {
    name: 'Homem de Ferro',
    description: '',
    imageUrl: 'https://freepngimg.com/save/149993-flying-iron-man-free-hq-image/1800x1620'
  },
  {
    name: 'Hulk',
    description: '',
    imageUrl: 'https://i2.wp.com/www.multarte.com.br/wp-content/uploads/2019/03/hulk-png-sem-fundo9.png?fit=674%2C1024&ssl=1'
  },
  {
    name: 'Mulher Maravilha',
    description: '',
    imageUrl: 'https://i.pinimg.com/originals/ff/d1/42/ffd1424eb5761ddd13ceb08231c1db5f.png'
  },
  {
    name: 'Batman',
    description: '',
    imageUrl: 'https://i0.wp.com/multarte.com.br/wp-content/uploads/2019/02/225cb8d8d207377e490d39188781fc5b.png?fit=1280%2C972&ssl=1'
  },
  {
    name: 'Robin',
    description: '',
    imageUrl: 'https://www.pngall.com/wp-content/uploads/2016/05/Superhero-Robin-PNG-Image.png'
  },
  {
    name: 'Shrek',
    description: '',
    imageUrl: 'https://www.pngplay.com/wp-content/uploads/12/Shrek-PNG-HD-Quality.png'
  },
  {
    name: 'Fiona',
    description: '',
    imageUrl: 'https://3.bp.blogspot.com/-pNlALxyXW9c/T-xW4G1kMKI/AAAAAAAARDo/CB9jK9rPzrw/s1600/imagens+png+shrek+%2825%29.png'
  },
  {
    name: 'Barbie',
    description: '',
    imageUrl: 'https://1.bp.blogspot.com/-UZ4Rc6qiwvc/Tn6wchG6J3I/AAAAAAAAaNo/lJz2fJ0XTzw/s1600/barbie3-753099.png'
  },
  {
    name: 'Hello Kitty',
    description: '',
    imageUrl: 'https://seeklogo.com/images/H/hello-kitty-logo-BDF54CDD8A-seeklogo.com.png'
  },
  {
    name: 'Pequeno Príncipe',
    description: '',
    imageUrl: 'https://www.lepetitprince.com/wp-content/uploads/2023/01/Illustration-lune-lpp-2.png'
  },
  {
    name: 'Pinóquio',
    description: '',
    imageUrl: 'https://pngimg.com/d/pinocchio_PNG33.png'
  },
  {
    name: 'Peter Pan',
    description: '',
    imageUrl: 'https://www.pngall.com/wp-content/uploads/2017/03/Peter-Pan-PNG-HD.png'
  },
  {
    name: 'Sininho',
    description: '',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0710/5901/3921/products/Tinkerbell.png?v=1675039042'
  },
  {
    name: 'Tarzan',
    description: '',
    imageUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/db9ed8c9-b18e-40d7-9b96-eb34d64138e6/df7808a-7ea81fca-c3b6-4e66-a515-3adae96e7287.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RiOWVkOGM5LWIxOGUtNDBkNy05Yjk2LWViMzRkNjQxMzhlNlwvZGY3ODA4YS03ZWE4MWZjYS1jM2I2LTRlNjYtYTUxNS0zYWRhZTk2ZTcyODcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.E3MOIvFY1oA_wYWM31oxo7TCH_hp7P6Rp-73MVfbe9g'
  },
  {
    name: 'Wandinha',
    description: '',
    imageUrl: 'https://mytopkid.com/wp-content/uploads/mytopkid.com-wednesday-addams-clipart-20.png'
  },
  {
    name: 'Sonic',
    description: '',
    imageUrl: 'https://i.pinimg.com/originals/a4/63/fb/a463fbb24303a7f39d0cdbb65f014c00.png'
  },
  {
    name: 'Mario',
    description: '',
    imageUrl: 'https://www.imagenspng.com.br/wp-content/uploads/2015/02/super-mario-mario-04-754x1024.png'
  },
  {
    name: 'Peach',
    description: '',
    imageUrl: 'https://i.pinimg.com/originals/42/03/50/4203500f3a29d1fc7da95c0adeca99f5.png'
  },
  {
    name: 'Midoriya',
    description: '',
    imageUrl: 'https://www.pngmart.com/files/13/Izuku-Midoriya-PNG-Image-Background.png'
  },
  {
    name: 'Pikachu',
    description: '',
    imageUrl: 'https://www.pngplay.com/wp-content/uploads/11/Pikachu-Pokemon-No-Background-Clip-Art.png'
  },
  {
    name: 'Todoroki',
    description: '',
    imageUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c2d0cffb-96b3-48e3-83bb-eb81054ac04a/dejtb2t-f40c52b4-465a-4101-9e50-5a8431093781.png/v1/fill/w_1280,h_1810/boku_no_hero_academia__shoto_todoroki_png_by_dglproductions_dejtb2t-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTgxMCIsInBhdGgiOiJcL2ZcL2MyZDBjZmZiLTk2YjMtNDhlMy04M2JiLWViODEwNTRhYzA0YVwvZGVqdGIydC1mNDBjNTJiNC00NjVhLTQxMDEtOWU1MC01YTg0MzEwOTM3ODEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.HSiwSfm0fp6HaRaW4f2yFsB2Mx_obNITLBWeWDG7zkw'
  },
  {
    name: 'Sakura',
    description: '',
    imageUrl: 'https://i.pinimg.com/originals/b9/23/9b/b9239b1e2e6fbfdcb3496cdb88569cb7.png'
  },
  {
    name: 'Sasuke',
    description: '',
    imageUrl: 'https://www.pngmart.com/files/3/Uchiha-Sasuke-PNG-Free-Download.png'
  },
  {
    name: 'Luffy',
    description: '',
    imageUrl: 'https://www.pngkit.com/png/full/61-613032_my-monkey-d-luffy-png.png'
  }
]