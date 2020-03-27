# Patch Notes 1.1
**Backend**
- Update da interface UtilizadorRepository;
- Update da class UtilizadorController;
- Implementada a class UtilizadorLog ao package com.app.server.model
- Implementada a class Agenda ao package com.app.server.model
- Implementada a class Anotacao ao package com.app.server.model
- Implementada a class Instituicao ao package com.app.server.model
- Implementada a class ReceitaMedia ao package com.app.server.model
- Implementada a class Recluso ao package com.app.server.model
- Implementada a class ReclusoLog ao package com.app.server.model
- Implementada a class RegistoAlerta ao package com.app.server.model
- Implementada a class RegistoCriminal ao package com.app.server.model

**Frontend**
- Update da página registar funcionário;
- Implementação do código JS para página dashboard;
- Implementação do código JS para página de avisos;
- Implementação do código JS para página perfil recluso;
- Implementação do código JS para página lista reclusos;
- Implementada a página perfil funcionários;
- Implementação do código JS para página de registar funcionários;
- Implementação do código JS para página perfil funcionário;
- Implementação do código JS para página lista funcionários;
- Implementado o modal para a adição de anotações a um recluso;

**Ligações Fetch**
- Ligação com a API para receber a lista de utilizadores (funcionários);
- Ligação com a API para receber os dados do perfil dos funcionários;


# Patch Notes 1.2
## Backend

 1. **Package Model:**
	 - Todas as classes foram reinscritas em camelCase e traduzidas para Inglês;
	 - Update da classe User.

2. **Package repository:**
	- Implementação da interface PrisonRepository;
	- Implementação da interface PrisonerRepository;
	- Implementação da interface MedicalPrescriptionRepository;
	- Implementação da interface CriminalRecordtionRepository;
	- Implementação da interface AlertLogRepository;
	- Implementação da interface PrisonerLogRepository;
	- Implementação da interface UserLogRepository;
	- Implementação da interface ScheduleRepository;
	- Implementação da interface AnotationRepository;
	- Implementação da interface RoleRepository.
	
3. **Package controller:**
	- Implementação da class PrisonController;
	- Implementação da class PrisonerController;
	- Implementação da class MedicalPrescriptionController;
	- Implementação da class CriminalRecordtionController;
	- Implementação da class AlertLogController;
	- Implementação da class PrisonerLogController;
	- Implementação da class UserLogController;
	- Implementação da class ScheduleController;
	- Implementação da class AuthController.

4. **Implementação do LogIn com a dependência security e com cookies:**
	- **Package config:**
		- Implementação da class SecurityConfig;
		- Implementação da class WebMvcConfig.

	- **Package payload.request:**
		- Implementação da class LoginRequest.

	- **Package payload.response:**
		- Implementação da class JwtAuthenticationResponse;
		- Implementação da class JwtAuthenticationResponseRole.

	- **Package security:**
		- Implementação da interface CurrentUser;
		- Implementação da class CustomUserDetailsService;
		- Implementação da class JwtAuthenticationEntryPoint;
		- Implementação da class JwtAuthenticationFilter;
		- Implementação da class JwtTokenProvider;
		- Implementação da class UserPrincipal.

	- **Package service:**
		- Implementação da class AuthService.

	- **Package util:**
		- Implementação da class CookieUtils.

5. **Implementação do cors para permitir o fetch envidar dados para o server:**
	- **Packge config:**
		- Implementação da class CorsConfig.

# Frontend

- Update da página lista de funcionários;
- Update da página lista de reclusos;
- Update da página Avisos;
- Update da página registar funcionário;

- Implementação da página lista de instituições; 
- Implementação da página de uma instituição;
- implementação da página registar recluso;

- Updade do código JS da página avisos;
- Updade do código JS da página dashboard;
- Updade do código JS da página funcionário;
- Updade do código JS da página lista de funcionários;
- Updade do código JS da página lista de reclusos;
- Updade do código JS da página registar funcionário;

- Implementação do código JS para a página instituição;
- Implementação do código JS para a página lista de instituições;
- Implementação do código JS para a página registar recluso;

- Implementação da agenda;

- implementação do código JS da agenda;
- implementação do código JS da barra de registo dos batimentos;


## Ligações Fetch

- Ligações com a API para registar um funcionário;
- Tratamento de erros do no registo de um funcionário;

***Nota:** Update da estrutura do patch notes apartir do patch 1.2*
