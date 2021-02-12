import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const fakeUrl = "http://localhost:8080/api/register";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientModule],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe("AuthService Register", () => {

  let service: AuthService;
  let httpMock: HttpTestingController;
  let requestReponse = {
    _id: "1",
    username: "toto",
  }
  let user: any = {
    _id: "1",
    username: "toto",
    email: "email@email.com",
    password: "password",
    age: 25,
    food: "food",
    race: "race",
    famille: "color",
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify()
  })

  it("Retourn un status 201 ,l'id et username si l'user et persité dans la DB", async () => {

    service.register(user).subscribe(result => {
      console.log(result.status);

      expect(result._id).toEqual(user._id);
      expect(result.username).toEqual(user.username);
    })

    httpMock.expectOne((req) => {
      expect(req.method).toEqual('POST');
      return req.url === `http://localhost:8080/api/register`
    })
      .flush(requestReponse,{
        headers:{},
        status: 200,
        statusText:"OK"
      });

  })

})
