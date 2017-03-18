import { OsbMangaReaderPage } from './app.po';

describe('osb-manga-reader App', () => {
  let page: OsbMangaReaderPage;

  beforeEach(() => {
    page = new OsbMangaReaderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
