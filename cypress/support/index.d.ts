declare namespace Cypress {
  interface Chainable {
    signInWithEmailAndPassword(email: string, password: string): void;
    signOut(): void;
  }
}
