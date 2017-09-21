import { HiscorewebPage } from './app.po';

describe('hiscoreweb App', () => {
  let page: HiscorewebPage;

  beforeEach(() => {
    page = new HiscorewebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
