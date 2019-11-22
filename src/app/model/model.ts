

export class Person {
  constructor(public id: string, public name: string, public imageSrc: string, public debts: Debt[]) {
  }
}


export class Debt {
  constructor(public id: string, public description: string, public price: number) {}
}

export class Debters {
  constructor(public loanerId: string, public debters: Person[]) {}
}
