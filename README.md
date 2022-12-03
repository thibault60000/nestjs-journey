## Description

[Nest](https://github.com/nestjs/nest) journey

## Installation

```bash
$ npm install
```

## Commands

`nest g mo`
Generate a module

`nest g co`
Generate a controller

`nest g s`
Generate a service (nest g s)

`nest g resource`
Module, Service, Controller, Class, DTO

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Errors

- UnauthorizedException
- BadRequestException
- NotFoundException
- ForbiddenException
- NotAcceptableException
- RequestTimeoutException
- ConflictException
- GoneException
- HttpVersionNotSupportedException
- PayloadTooLargeException
- UnsupportedMediaTypeException
- UnprocessableEntityException
- InternalServerErrorException
- NotImplementedException
- ImATeapotException
- MethodNotAllowedException
- BadGatewayException
- ServiceUnavailableException
- GatewayTimeoutException
- PreconditionFailedException

Custom exception[https://docs.nestjs.com/exception-filters#exception-filters-1]
with `@Catch` and `@UseFilters`

## Pipes

- ValidationPipe
- ParseIntPipe
- ParseFloatPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- ParseEnumPipe
- DefaultValuePipe
- ParseFilePipe
