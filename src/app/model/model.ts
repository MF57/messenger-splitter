export class Person {
  constructor(public id: string, public name: string, public imageSrc: string) {
  }
}

export class Debt {
  constructor(public id: string, public description: string, public price: number) {}
}
