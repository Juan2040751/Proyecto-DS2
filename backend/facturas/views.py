from rest_framework import  viewsets, status
from .serializer import FacturaSerializer
from .models import Factura, ProductosComprados
from rest_framework.response import Response
from productos.models import Producto
# Create your views here.
class FacturaViewset(viewsets.ModelViewSet):
    queryset = Factura.objects.all()
    serializer_class = FacturaSerializer

    def create(self, request):
      productos_data = request.data.pop("productos")
      vendedor = request.data.pop("vendedor")  
      factura =self.get_serializer(data={'vendedor': vendedor})
      if factura.is_valid():
        self.perform_create(factura)
      headers = self.get_success_headers(factura.data)
    
      for producto_data in productos_data:
        producto = Producto.objects.get(pk=producto_data["producto"])
        cantidad=producto_data["cantidad"]
        facturaObj = Factura.objects.get(pk=factura.data.get('id'))
        ProductosComprados.objects.create(factura=facturaObj,cantidad=cantidad, producto=producto)
        print(factura.data)
      return Response(factura.data, status=status.HTTP_201_CREATED, headers=headers)
    def perform_create(self, serializer):
      serializer.save()
