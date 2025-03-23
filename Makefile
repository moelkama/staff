
dev:
	docker-compose -f docker-compose.dev.yaml up --build -d

prod:
	docker-compose -f docker-compose.prod.yml up --build -d

down:
	docker-compose down

clean:
	docker-compose down --volumes

fclean:
	docker-compose down --volumes --rmi all

.PHONY: dev prod down clean fclean