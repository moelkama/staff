
dev:
	docker-compose -f docker-compose.dev.yaml up --build -d

prod:
	docker-compose -f docker-compose.prod.yml up --build -d

down_dev:
	docker-compose -f docker-compose.dev.yaml down --volumes

down_prod:
	docker-compose -f docker-compose.prod.yml down --volumes

clean:
	docker-compose down --volumes

fclean:
	docker-compose down --volumes --rmi all

.PHONY: dev prod down clean fclean