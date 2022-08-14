from django.apps import AppConfig


class BookConfig(AppConfig):
    name = 'Books'
    def ready(self):
        import Books.signals 
