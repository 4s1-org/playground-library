export class Foo {
  public log() {
    console.log('Foo')
  }

  public login(username: string, password: string): void {
    console.log(username)
    console.log(password)
  }

  public foo(): void {
    for (let i = 0; i < 10; ) {
      console.log(i)
    }
  }
}
