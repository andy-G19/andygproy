import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    // Configuración del módulo de prueba
    await TestBed.configureTestingModule({
      imports: [LoginComponent], // Importamos el componente
      providers: [AuthService]  // Inyectamos el servicio AuthService
    })
    .compileComponents();

    // Creamos una instancia del componente y del servicio
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);  // Inyectamos el servicio en la prueba
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verifica si el componente se crea correctamente
  });

  it('should call login method from AuthService when login is clicked', () => {
    spyOn(authService, 'login');  // Espía el método login
    component.login();  // Llama al método login del componente
    expect(authService.login).toHaveBeenCalled();  // Verifica si se llamó al método
  });

  it('should call logout method from AuthService when logout is clicked', () => {
    spyOn(authService, 'logout');  // Espía el método logout
    component.logout();  // Llama al método logout del componente
    expect(authService.logout).toHaveBeenCalled();  // Verifica si se llamó al método
  });
});