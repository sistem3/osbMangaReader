import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  providers: [SearchService]
})
export class SearchComponent implements OnInit {

  searchTerm: string;
  searchResults: any;

  constructor(private route: ActivatedRoute,
              private searchService: SearchService) { }

  ngOnInit() {
    this.route.params.subscribe((term) => this.getSearchDetails(term));
  }

  getSearchDetails(termData) {
    console.log(termData);
    this.searchTerm = termData.term;
    this.searchService.getSearchResults(this.searchTerm).subscribe((searchResults) => {
      console.log(searchResults);
      this.searchResults = searchResults;
    });
  }

}
