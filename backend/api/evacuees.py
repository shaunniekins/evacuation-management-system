from backend.models import Evacuees, Evacuation, Barangay, Municipality


def get_evacuee_count():
    return Evacuees.objects.count()


def get_family_count():
    return Evacuees.objects.filter(is_head='YES').count()


def get_male_count():
    return Evacuees.objects.filter(gender='MALE').count()


def get_female_count():
    return Evacuees.objects.filter(gender='FEMALE').count()


def get_family_count():
    return Evacuees.objects.filter(is_head='YES').count()


def get_evacuation_center_count():
    return Evacuation.objects.count()


def get_barangay_count():
    return Barangay.objects.count()


def get_barangay_items():
    return Barangay.objects.values_list('name', flat=True)


def get_municipality_items():
    return Municipality.objects.values_list('name', flat=True)
