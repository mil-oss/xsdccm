module xsdsrv

replace xmlsrv => ./xmlsrv

go 1.14

require (
	github.com/gin-contrib/static v0.0.0-20191128031702-f81c604d8ac2
	github.com/gin-gonic/gin v1.6.2
	github.com/lestrrat/go-libxml2 v0.0.0-20180221004755-bb78334e2019 // indirect
	github.com/pkg/errors v0.9.1 // indirect
	github.com/rs/cors v1.7.0
	xmlsrv v0.0.0-00010101000000-000000000000
)
