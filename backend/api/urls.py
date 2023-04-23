from django.urls import path
from . import views
# from .views import MyTokenObtainPairView
from .views import CustomUserList

from django.conf import settings
from django.conf.urls.static import static

# from rest_framework_simplejwt.views import (
#     TokenRefreshView,
# )

urlpatterns = [
    # path('', views.getRoutes),

    path('users/', CustomUserList.as_view(), name='user-list'),
    # add new url pattern for detail view
    path('users/<int:pk>', CustomUserList.as_view(), name='user-detail'),

    # path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('evacuee/', views.EvacueesAPI),
    path('evacuee/<int:pk>', views.EvacueesAPI),

    path('municipality/', views.MunicipalityAPI),
    path('municipality/<int:pk>', views.MunicipalityAPI),

    path('barangay/', views.BarangayAPI),
    path('barangay/<int:pk>', views.BarangayAPI),

    path('evacuation/', views.EvacuationAPI),
    path('evacuation/<int:pk>', views.EvacuationAPI),

    path('calamity/', views.CalamityAPI),
    path('calamity/<int:pk>', views.CalamityAPI),

    path('items/', views.ItemList),
    path('items/<int:pk>', views.ItemList),

    path('inventory/', views.InventoryList),
    path('inventory/<int:pk>', views.InventoryList),

    path('stockin/', views.StockedInAPI),
    path('stockin/<int:pk>', views.StockedInAPI),

    # path('repackedlist/', views.RepackedListAPI),
    # path('repackedlist/<int:pk>', views.RepackedListAPI),

    path('repacked/', views.RepackedAPI),
    path('repacked/<int:pk>', views.RepackedAPI),

    path('distributed/', views.DistributedAPI),
    path('distributed/<int:pk>', views.DistributedAPI),

    path('cashdonation/', views.CashDonationAPI),
    path('cashdonation/<int:pk>', views.CashDonationAPI),

    path('evacuee_count', views.evacuee_count),
    path('family_count', views.family_count),
    path('male_count', views.male_count),
    path('female_count', views.female_count),
    path('family_count', views.family_count),
    path('evacuation_center_count', views.evacuation_center_count),
    path('barangay_count', views.barangay_count),
    path('barangay_item', views.barangay_items),
    path('municipality_item', views.municipality_items)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
