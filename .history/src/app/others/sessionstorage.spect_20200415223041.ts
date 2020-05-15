import { TestBed, ComponentFixture } from "@angular/core/testing";
import { CompanyInformationComponent } from "./company-information.component";
import { RestDataService } from "src/common/rest-data.service";
import { TranslateModule } from "@ngx-translate/core";
import { CompanyInformationDTO, BaseDTO } from "src/common/common.models";
import { of, throwError } from "rxjs";
import { StorageConstants, APIConstants } from "src/common/constants";
import { By } from "@angular/platform-browser";

describe("CompanyInformationComponent", () => {
  let fixture: ComponentFixture<CompanyInformationComponent>;
  let mockRestDataService;
  let responseDTO: BaseDTO;
  let responseErrorDTO: BaseDTO;

  const companyInformationDTO: CompanyInformationDTO = {
    bingCustId: 100,
    bingCustDisplayId: "X100",
    name: "SuperDude",
    addressLine1: "701 1st Avenue",
    addressLine2: "Building B",
    city: "Sunnyvale",
    state: "CA",
    country: "USA",
    zip: "94089",
    category: "Travel and Transportation",
    paymentType: "Pre-Pay",
  };

  const settings = {
    accountId: "400",
    custId: "100",
    locale: "en-US",
    country: "TW",
  };

  beforeEach(() => {
    mockRestDataService = jasmine.createSpyObj(["get", "handleError"]);

    TestBed.configureTestingModule({
      declarations: [CompanyInformationComponent],
      providers: [{ provide: RestDataService, useValue: mockRestDataService }],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyInformationComponent);

    const storage = {};

    const mockSessionStorage = {
      getItem: (key: string) => {
        return storage[key];
      },
      setItem: (key: string, value: string) => {
        storage[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete storage[key];
      },
      clear: {},
    };

    spyOn(sessionStorage, "setItem").and.callFake(mockSessionStorage.setItem);
    spyOn(sessionStorage, "getItem").and.callFake(mockSessionStorage.getItem);
  });

  it("should fetch company information on load and serve on template", () => {
    responseDTO = {
      requestTracer: "search-ui-request1",
      data: companyInformationDTO,
    };
    mockRestDataService.get.and.returnValue(of(responseDTO));
    sessionStorage.setItem(
      StorageConstants.DOMAIN_CONSTANTS,
      JSON.stringify(settings)
    );

    fixture.detectChanges();

    const companyInformationFixtureObj =
      fixture.componentInstance.companyInformation;
    expect(
      +JSON.parse(sessionStorage.getItem(StorageConstants.DOMAIN_CONSTANTS))
        .custId
    ).toBe(100);
    for (const key in companyInformationFixtureObj) {
      if (companyInformationFixtureObj.hasOwnProperty(key)) {
        expect(companyInformationFixtureObj[key]).toEqual(
          companyInformationDTO[key]
        );
      }
    }

    const de = fixture.debugElement.queryAll(
      By.css('div[data-test="ciName"]')
    )[0];
    expect(de.nativeElement.textContent).toEqual("SuperDude");
    expect(mockRestDataService.get).toHaveBeenCalledWith(
      `${APIConstants.COMPANY_INFORMATION}/100`
    );
  });

  it("should handle error on fetch company information failure", () => {
    responseErrorDTO = {
      requestTracer: "search-ui-request2",
      error: {
        code: "E101",
        message: "Failed to fetch company information",
      },
    };
    mockRestDataService.handleError.and.returnValue(of(responseErrorDTO.error));
    mockRestDataService.get.and.returnValue(
      throwError({ error: responseErrorDTO.error })
    );
    sessionStorage.setItem(
      StorageConstants.DOMAIN_CONSTANTS,
      JSON.stringify(settings)
    );

    fixture.detectChanges();

    expect(mockRestDataService.get).toHaveBeenCalledWith(
      `${APIConstants.COMPANY_INFORMATION}/100`
    );
    expect(mockRestDataService.handleError).toHaveBeenCalledWith(
      responseErrorDTO.error
    );
    expect(fixture.componentInstance.companyInformation).toBeUndefined(true);
  });
});
