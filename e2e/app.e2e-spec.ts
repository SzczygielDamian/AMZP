import { AMZPPage } from './app.po';

describe('amzp App', function() {
  let page: AMZPPage;

  beforeEach(() => {
    page = new AMZPPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
